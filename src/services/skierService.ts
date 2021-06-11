import { Service } from "typedi";
import * as Constants from "../constants/consts";
import  Entity  from "../loaders/entity";
import { intersectTwoRects, Rect } from "../utilities/utils";
import ObstacleService from "../services/obstacleService"
import AssetManager from "../loaders/assetManager";

@Service()
export default class Skier extends Entity {
  assetName: string = Constants.SKIER_DOWN;
  direction: number = Constants.SKIER_DIRECTIONS.DOWN;
  lastDirection: number = this.direction;
  speed: number = Constants.SKIER_STARTING_SPEED;
   isCrashed: boolean = false;
  constructor(x: number, y: number) {
    super(x, y);
  }

  restartSkier() {
    this.assetName = Constants.SKIER_DOWN;
    this.direction = Constants.SKIER_DIRECTIONS.DOWN;
    this.lastDirection = this.direction;
    this.speed = Constants.SKIER_STARTING_SPEED;
    this.x = 0;
    this.y = 0;
  }

  setDirection(direction: number) {
    this.direction = direction;
    this.updateAsset();
  }

  setLastDirection(direction: number) {
    this.lastDirection = direction;
  }
  updateAsset() {
    this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
  }

  move() {
    switch (this.direction) {
      case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
        this.moveSkierLeftDown();
        break;
      case Constants.SKIER_DIRECTIONS.DOWN:
        this.moveSkierDown();
        break;
      case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
        this.moveSkierRightDown();
        break;
      case Constants.SKIER_DIRECTIONS.LEFT:
        this.moveSkierLeft();
        break;
      case Constants.SKIER_DIRECTIONS.RIGHT:
        this.moveSkierRight();
        break;
      case Constants.SKIER_DIRECTIONS.UP:
        this.moveSkierUp();
        break;
    }
  }

  moveSkierLeft() {
    this.x -= Constants.SKIER_STARTING_SPEED;
  }

  moveSkierLeftDown() {
    this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
  }

  moveSkierDown() {
    this.y += this.speed;
  }

  moveSkierRightDown() {
    this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
  }

  moveSkierRight() {
    this.x += Constants.SKIER_STARTING_SPEED;
  }

  moveSkierUp() {
    this.y += this.speed;
  }

  turnLeft() {
    this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
    this.updateLastDirection();
    this.updateCrashedStatus();
  }

  turnRight() {
    this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
    this.updateLastDirection();
    this.updateCrashedStatus();
  }

  turnUp() {
    this.setDirection(Constants.SKIER_DIRECTIONS.UP);
    this.updateLastDirection();
    this.updateCrashedStatus();
  }


  turnDown() {
    this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    this.updateLastDirection();
    this.updateCrashedStatus();
  }

  turnLeftDown() {
    this.setDirection(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
    this.updateLastDirection();
    this.updateCrashedStatus();
  }
  turnRightDown() {
    this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
    this.updateLastDirection();
    this.updateCrashedStatus();
  }
  updateCrashedStatus() {
    if (this.direction != Constants.SKIER_DIRECTIONS.CRASH) {
      this.isCrashed = false;
    }
  }


  updateLastDirection() {
    this.setLastDirection(this.direction);
  }

  setSkierJumpOverRock(obstacleName: string) {
    if (
      this.direction === Constants.SKIER_DIRECTIONS.UP &&
      (obstacleName === Constants.ROCK1 || obstacleName === Constants.ROCK2)
    )
      return true;
  }

  makeSkierJumpIfHitRamp(obstacleName: string) {
    if (obstacleName === Constants.JUMP_RAMP) {
      this.turnUp();
      return true;
    }
  }

  CheckIfSkierShouldJump(obstacleName: string) {
    return (
      this.setSkierJumpOverRock(obstacleName) ||
      this.makeSkierJumpIfHitRamp(obstacleName)
    );
  }

  checkIfSkierHitObstacle(
    obstacleService: ObstacleService,
    assetManager: AssetManager
  ) {
    const asset = assetManager.getAsset(this.assetName);
    const skierBounds = new Rect(
      this.x - asset.width / 2,
      this.y - asset.height / 2,
      this.x + asset.width / 2,
      this.y - asset.height / 4
    );

    const collision = obstacleService.getObstacles().find((obstacle) => {
      const obstacleName = obstacle.getAssetName();
      const obstacleAsset = assetManager.getAsset(obstacleName);
      const obstaclePosition = obstacle.getPosition();
      const obstacleBounds = new Rect(
        obstaclePosition.x - obstacleAsset.width / 2,
        obstaclePosition.y - obstacleAsset.height / 2,
        obstaclePosition.x + obstacleAsset.width / 2,
        obstaclePosition.y
      );
      const checkIfTwoRectsntersect = intersectTwoRects(
        skierBounds,
        obstacleBounds
      );

      if (checkIfTwoRectsntersect && this.CheckIfSkierShouldJump(obstacleName))
        return false;

      return checkIfTwoRectsntersect;
    });

    if (collision) {
      this.isCrashed = true;
      this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
    }
  }
}
