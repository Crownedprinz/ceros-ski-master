import { Service } from "typedi";
import AssetManager from "../loaders/assetManager";
import Canvas from "../loaders/canvas";
import Skier from "./skierService";

@Service()
export default class ScoreService {
  x: number;
  y: number;
  score: number = 0;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  resetScore(){
      this.score = 0;
      this.x = 0;
      this.y = 0;
  }

  updateScore(skier:Skier){
      if(!skier.isCrashed){
         this.score += 1;
      }
  }

  drawScore(canvas: Canvas) {
    canvas.drawText("30px Consolas", "Red", `Score: ${this.score}`, 100, 40);
  }
}