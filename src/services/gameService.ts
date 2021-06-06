import AssetManager from "../loaders/assetManager";
import * as Constants from "../constants/consts";
import ObstacleService from "../services/obstacleService";
import  Canvas  from "../loaders/canvas";
import Skier from "../services/skierService"
import { Rect } from "../utilities/utils";
import Rhino from "../services/rhinoService"
import { Service } from "typedi";

@Service()
export default class Game  {
  gameWindow: Rect = new Rect(0, 0, 0, 0);

  constructor(
    private assetManager: AssetManager,
    private obstacleService: ObstacleService,
    private skier: Skier,
    private canvas: Canvas,
    private rhino: Rhino
  ) {
    this.skier = new Skier(0, 0);
    this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
    this.rhino = new Rhino(0, 0);
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
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

    this.rhino.move(this.skier);
    this.rhino.endIfRhinoCatchSkier(this.assetManager, this.skier);
    this.rhino.updateAction(this.skier);
  }

  drawGameWindow() {
    this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);

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

  handleKeyDown(event: any) {
    switch (event.which) {
      case Constants.KEYS.LEFT:
        this.skier.turnLeft();
        event.preventDefault();
        break;
      case Constants.KEYS.RIGHT:
        this.skier.turnRight();
        event.preventDefault();
        break;
      case Constants.KEYS.UP:
        this.skier.turnUp();
        event.preventDefault();
        break;
      case Constants.KEYS.DOWN:
        this.skier.turnDown();
        event.preventDefault();
        break;
    }
  }

 
}