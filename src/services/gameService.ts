import AssetManager from "../loaders/assetManager";
import * as Constants from "../constants/consts";
import ObstacleService from "../services/obstacleService";
import Canvas from "../loaders/canvas";
import Skier from "../services/skierService";
import { Rect } from "../utilities/utils";
import Rhino from "../services/rhinoService";
import { Service } from "typedi";
import Score from "./scoreService";
import Sound from "./soundService";

@Service()
export default class Game {
  gameWindow: Rect = new Rect(0, 0, 0, 0);
  private keys: any = [];
  private bkMusic: any;
  private isPaused: boolean = false;
  constructor(
    private assetManager: AssetManager,
    private obstacleService: ObstacleService,
    private skier: Skier,
    private canvas: Canvas,
    private rhino: Rhino,
    private score: Score,
    private sound: Sound
  ) {
    this.skier = new Skier(0, 0);
    this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
    this.rhino = new Rhino(0, 0);
    this.score = new Score(0, 0);
    this.sound = new Sound("public/sounds/failing.wav");
    this.bkMusic = new Sound("public/sounds/background.mp3");
    this.startBackGroundMusic();
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyDown.bind(this));
  }

  init() {
    this.obstacleService.placeInitialObstacles();
  }

  async load() {
    await this.assetManager.loadAssets(Constants.ASSETS);
  }

  run() {
    this.canvas.clearCanvas();

    this.updateGameWindow();
    this.drawGameWindow();

    requestAnimationFrame(this.run.bind(this));
  }

  updateGameWindow() {
    this.drawInstructions();
    this.skier.move();
    const previousGameWindow = this.gameWindow;
    this.calculateGameWindow();
    this.obstacleService.placeNewObstacle(this.gameWindow, previousGameWindow);
    this.skier.checkIfSkierHitObstacle(this.obstacleService, this.assetManager);
    this.updateScore();
    this.rhino.move(this.skier);
    this.rhino.endIfRhinoCatchSkier(
      this.assetManager,
      this.skier,
      this.sound,
      this.bkMusic
    );
    this.rhino.updateAction(this.skier);
  }

  resetGame() {
    this.skier.restartSkier();
    this.rhino.restartRhino();
    this.isPaused = false;
    this.obstacleService.restartObstacle();
    this.score.resetScore();
    this.bkMusic.reset("public/sounds/background.mp3");
  }

  updateScore() {
    if (!this.isPaused && !this.skier.isCrashed) {
      this.score.updateScore();
      this.updateLive();
    }
  }

  updateLive() {
    this.score.updateLive(this.skier.lives);
  }

  drawGameWindow() {
    this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);
    this.score.drawScore(this.canvas);
    this.skier.draw(this.canvas, this.assetManager);
    this.obstacleService.drawObstacles(this.canvas, this.assetManager);
    this.rhino.drawRhino(this.canvas, this.assetManager);
  }
  drawInstructions() {
    this.canvas.drawText(
      "18px Consolas",
      "Red",
      `R button to reset game`,
      this.canvas.width / 1.2,
      40
    );
    this.canvas.drawText(
      "18px Consolas",
      "Red",
      `spacebar to pause game`,
      this.canvas.width / 1.2,
      60
    );
    this.canvas.drawText(
      "18px Consolas",
      "Red",
      `left | right | down keys to move`,
      this.canvas.width / 1.2,
      80
    );
    this.canvas.drawText(
      "18px Consolas",
      "Red",
      `up button to jump over stones`,
      this.canvas.width / 1.2,
      100
    );
  }

  pause() {
    if (this.isPaused) {
      this.bkMusic.play();
      this.skier.setDirection(this.skier.lastDirection);
      this.isPaused = false;
    } else {
      this.bkMusic.stop();
      this.isPaused = true;
      this.skier.setDirection(Constants.SKIER_DIRECTIONS.PAUSE);
    }
  }
  calculateGameWindow() {
    const skierPosition = this.skier.getPosition();
    const left = skierPosition.x - Constants.GAME_WIDTH / 2;
    const top = skierPosition.y - Constants.GAME_HEIGHT / 2;

    this.gameWindow = new Rect(
      left,
      top,
      left + Constants.GAME_WIDTH,
      top + Constants.GAME_HEIGHT
    );
  }
  startBackGroundMusic() {
    this.bkMusic.autoplay();
    this.bkMusic.play();
  }

  stopBackGroundMusic() {
    this.bkMusic.stop();
  }

  handleKeyDown(event: any) {
    if (event.type === "keyup") {
      this.keys[event.which] = event.type == "keydown";
    }
    if (event.type === "keydown") {
      this.keys = this.keys || [];
      this.keys[event.which] = event.type == "keydown";
    }
    if (this.keys) {
      if (this.keys[Constants.KEYS.LEFT]) {
        this.skier.turnLeft();
        event.preventDefault();
      }
      if (this.keys[Constants.KEYS.RIGHT]) {
        this.skier.turnRight();
        event.preventDefault();
      }
      if (this.keys[Constants.KEYS.UP]) {
        this.skier.turnUp();
        event.preventDefault();
      }
      if (this.keys[Constants.KEYS.DOWN]) {
        this.skier.turnDown();
        event.preventDefault();
      }
      if (this.keys[Constants.KEYS.SPACE]) {
        this.pause();
        event.preventDefault();
      }
      if (this.keys[Constants.KEYS.Reset]) {
        this.resetGame();
        event.preventDefault();
      }
      if (this.keys[Constants.KEYS.DOWN] && this.keys[Constants.KEYS.RIGHT]) {
        this.skier.turnRightDown();
        event.preventDefault();
      }
      if (this.keys[Constants.KEYS.DOWN] && this.keys[Constants.KEYS.LEFT]) {
        this.skier.turnLeftDown();
        event.preventDefault();
      }
    }
  }
}
