import * as Constants from "../constants/consts";
import Entity  from "../models/entity";
import { randomInt } from "../utilities/utils";

const assetTypes = [
  Constants.TREE,
  Constants.TREE_CLUSTER,
  Constants.ROCK1,
  Constants.ROCK2,
  Constants.JUMP_RAMP,
];

export class Obstacle extends Entity {
  constructor(x:number, y:number) {
    super(x, y);

    const assetIdx = randomInt(0, assetTypes.length - 1);
    this.assetName = assetTypes[assetIdx];
  }
}
