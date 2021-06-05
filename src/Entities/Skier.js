import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Skier extends Entity {
  assetName = Constants.SKIER_DOWN;

  direction = Constants.SKIER_DIRECTIONS.DOWN;
  speed = Constants.SKIER_STARTING_SPEED;

  constructor(x, y) {
    super(x, y);
  }

  setDirection(direction) {
    this.direction = direction;
    this.updateAsset();
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
      case Constants.SKIER_DIRECTIONS.RIGHT:
        this.moveSkierRight();
        break;
      case Constants.SKIER_DIRECTIONS.LEFT:
        this.moveSkierLeft();
        break;
      case Constants.SKIER_DIRECTIONS.UP:
        this.moveSkierUp();
        break;
      case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
        this.moveSkierRightDown();
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
    // if(this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
    //     this.moveSkierLeft();
    // }
    // else {
    //   this.setDirection(this.direction - 1);
    // }
    this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
  }

  turnRight() {
    // if(this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
    //     this.moveSkierRight();
    // }
    // else {
    //     this.setDirection(this.direction + 1);
    // }

    this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
  }

  turnUp() {
    this.setDirection(Constants.SKIER_DIRECTIONS.UP);
  }

  turnDown() {
    this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
  }

  isSkierJump(obstacle) {
    if (
      this.direction === Constants.SKIER_DIRECTIONS.UP &&
      (obstacle === Constants.ROCK1 || obstacle === Constants.ROCK2)
    )
      return true;
  }

  jump(obstacle) {
    if (obstacle === Constants.JUMP_RAMP) {
      this.turnUp();
      return true;
    }
  }

  checkSkierJumpStatus(obstacle) {
    return this.isSkierJump(obstacle) || this.jump(obstacle);
  }

  checkIfSkierHitObstacle(obstacleManager, assetManager) {
    const asset = assetManager.getAsset(this.assetName);
    const skierBounds = new Rect(
      this.x - asset.width / 2,
      this.y - asset.height / 2,
      this.x + asset.width / 2,
      this.y - asset.height / 4
    );

    const collision = obstacleManager.getObstacles().find((obstacle) => {
      const obstacleName = obstacle.getAssetName();
      const obstacleAsset = assetManager.getAsset(obstacleName);
      const obstaclePosition = obstacle.getPosition();
      const obstacleBounds = new Rect(
        obstaclePosition.x - obstacleAsset.width / 2,
        obstaclePosition.y - obstacleAsset.height / 2,
        obstaclePosition.x + obstacleAsset.width / 2,
        obstaclePosition.y
      );
        
      const result = intersectTwoRects(skierBounds, obstacleBounds);
        if (result && this.checkSkierJumpStatus(obstacleName)) return false;
            
      return result;
    });

    if (collision) {
      this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
    }
  }
}