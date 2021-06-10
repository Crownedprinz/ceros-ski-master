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
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyDown.bind(this));
    this.startBackGroundMusic();
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
    this.skier.move();
    const previousGameWindow = this.gameWindow;
    this.calculateGameWindow();

    this.obstacleService.placeNewObstacle(this.gameWindow, previousGameWindow);
    this.skier.checkIfSkierHitObstacle(this.obstacleService, this.assetManager);
    this.score.updateScore(this.skier);
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
    this.obstacleService.restartObstacle();
    this.score.resetScore();
  }

  drawGameWindow() {
    this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);
    this.score.drawScore(this.canvas);
    this.skier.draw(this.canvas, this.assetManager);
    this.obstacleService.drawObstacles(this.canvas, this.assetManager);
    this.rhino.drawRhino(this.canvas, this.assetManager);
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
    if (event.type === "touchmove") {
      if(event.touches[0].screenX && event.touches[0].screenY){
      this.skier.touchMovement(
        event.touches[0].screenX,
        event.touches[0].screenY
      );
      }
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
        this.skier.pause();
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
