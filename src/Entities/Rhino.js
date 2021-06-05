import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

const RHINO_SKIER_STARTING_DISTANCE = 3000;
const ACTION_DURATION = 700;

export class Rhino extends Entity {
  assetName = Constants.RHINO_RUN_LEFT;
  action = Constants.RHINO_ACTIONS.CHASE_SKIER;

  constructor(x, y) {
    super(x, y);
  }

  drawRhino(canvas, assetManager) {
    if (this.y >= RHINO_SKIER_STARTING_DISTANCE) {
      this.draw(canvas, assetManager);
    }
  }

  move(skier) {
    if (
      skier.y >= RHINO_SKIER_STARTING_DISTANCE &&
      this.action === Constants.RHINO_ACTIONS.CHASE_SKIER
    ) {
      this.y = skier.y;
      switch (skier.direction) {
        case Constants.SKIER_DIRECTIONS.DOWN:
          this.moveDown(skier.y);
          break;
        case Constants.SKIER_DIRECTIONS.LEFT:
          this.moveLeft(skier.speed);
          break;
        case Constants.SKIER_DIRECTIONS.RIGHT:
          this.moveRight(skier.speed);
          break;
        case Constants.SKIER_DIRECTIONS.UP:
          this.moveUp(skier.y);
          break;
        case Constants.SKIER_DIRECTIONS.CRASH:
          this.moveDown(skier.y);
          break;
      }
    }
  }

  moveLeft(skier_speed) {
    this.x += skier_speed;
  }

  moveRight(skier_speed) {
    this.x += skier_speed * 2;
  }

  moveUp(skier_position_x) {
    this.x = skier_position_x - RHINO_SKIER_STARTING_DISTANCE * 2;
  }

  moveDown(skier_position_y) {
    this.x = skier_position_y - RHINO_SKIER_STARTING_DISTANCE * 2;
  }

  destroySkier(assetManager, skier) {
    if (this.action === Constants.RHINO_ACTIONS.CHASE_SKIER) {
      const asset = assetManager.getAsset(this.assetName);
      const RhinoBounds = new Rect(
        this.x - asset.width / 2,
        this.y - asset.height / 2,
        this.x + asset.width / 2,
        this.y - asset.height / 4
      );

      const SkierAsset = assetManager.getAsset(skier.assetName);
      const SkierBounds = new Rect(
        skier.x - SkierAsset.width / 2,
        skier.y - SkierAsset.height / 2,
        skier.x + SkierAsset.width / 2,
        skier.y - SkierAsset.height / 4
      );
      const collision = intersectTwoRects(RhinoBounds, SkierBounds);

      if (collision) {
        this.removeSkier(skier);
        this.setAction(Constants.RHINO_ACTIONS.LIFT_SKIER);
      }
    }
  }

  removeSkier(skier) {
    skier.direction = Constants.SKIER_DIRECTIONS.KILL;
    skier.y = this.y;
    skier.x = this.x;
    skier.assetName = Constants.KILL_SKIER;
  }

  setAction(action) {
    this.action = action;
    this.updateAsset();
  }

  updateAsset() {
    this.assetName = Constants.RHINO_ACTION_ASSET[this.action];
  }

  updateAction(skier) {
    if (this.action) {
      this.removeSkier(skier);
      switch (this.action) {
        case Constants.RHINO_ACTIONS.LIFT_SKIER:
          this.changeAction(Constants.RHINO_ACTIONS.LIFT_MOUTH_OPEN_SKIER);
          break;
        case Constants.RHINO_ACTIONS.LIFT_MOUTH_OPEN_SKIER:
          this.changeAction(Constants.RHINO_ACTIONS.CHEW_SKIER);
          break;
        case Constants.RHINO_ACTIONS.CHEW_SKIER:
          this.changeAction(Constants.RHINO_ACTIONS.SWALLOW_SKIER);
          break;
        case Constants.RHINO_ACTIONS.SWALLOW_SKIER:
          this.changeAction(Constants.RHINO_ACTIONS.END);
          break;
      }
    }
  }

  changeAction(rhinoAction) {
    var _this = this;
    setTimeout(function () {
      _this.setAction(rhinoAction);
    }, ACTION_DURATION);
  }
}
