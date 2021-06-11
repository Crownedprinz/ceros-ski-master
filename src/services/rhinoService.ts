import { Service } from "typedi";
import * as Constants from "../constants/consts";
import AssetManager from "../loaders/assetManager";
import Canvas from "../loaders/canvas";
import Entity  from "../loaders/entity";
import { intersectTwoRects, Rect } from "../utilities/utils";
import Skier from "./skierService";
import Sound from "./soundService";

const RHINO_SKIER_STARTING_DISTANCE = 3000;
const ACTION_DURATION = 700;

@Service()
export default class Rhino extends Entity {
  assetName = Constants.RHINO_RUN_LEFT;
  action = Constants.RHINO_ACTIONS.CHASE_SKIER;

  constructor(x: number, y: number) {
    super(x, y);
  }

  restartRhino(){
        this.assetName = Constants.RHINO_RUN_LEFT;
        this.action = Constants.RHINO_ACTIONS.CHASE_SKIER;
        this.x = 0;
        this.y = 0;

  };

  drawRhino(canvas: Canvas, assetManager: AssetManager) {
    if (this.y >= RHINO_SKIER_STARTING_DISTANCE) {
      this.draw(canvas, assetManager);
    }
  }

  move(skier: Skier) {
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

  moveLeft(skier_speed: number) {
    this.x += skier_speed;
  }

  moveRight(skier_speed: number) {
    this.x += skier_speed * 2;
  }

  moveUp(skier_position_x: number) {
    this.x = skier_position_x - RHINO_SKIER_STARTING_DISTANCE * 2;
  }

  moveDown(skier_position_y: number) {
    this.x = skier_position_y - RHINO_SKIER_STARTING_DISTANCE * 2;
  }

  endIfRhinoCatchSkier(assetManager: AssetManager, skier: Skier, sound: Sound,bkMusic: Sound) {
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
        bkMusic.stop();
        sound.play();
        this.removeSkier(skier);
        this.setAction(Constants.RHINO_ACTIONS.LIFT_SKIER);
      }
    }
  }

  removeSkier(skier: Skier) {
    skier.isCrashed = true;
    skier.direction = Constants.SKIER_DIRECTIONS.KILL;
    skier.y = this.y;
    skier.x = this.x;
    skier.assetName = Constants.KILL_SKIER;
  }

  setAction(action: number) {
    this.action = action;
    this.updateAsset();
  }

  updateAsset() {
    this.assetName = Constants.RHINO_ACTION_ASSET[this.action];
  }

  updateAction(skier: Skier) {
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

  changeAction(rhinoAction: number) {
    var _this = this;
    setTimeout(function () {
      _this.setAction(rhinoAction);
    }, ACTION_DURATION);
  }
}
