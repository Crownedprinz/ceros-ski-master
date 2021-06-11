import { Service } from "typedi";
import Canvas from "../loaders/canvas";

@Service()
export default class ScoreService {
  private x: number;
  private y: number;
  private score: number = 0;
  private lives: number = 0;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  resetScore() {
    this.score = 0;
    this.x = 0;
    this.y = 0;
  }

  updateScore() {
    this.score += 1;
  }
  
  updateLive(live:number){
    this.lives = live;
  }



  drawScore(canvas: Canvas) {
    canvas.drawText("30px Consolas", "Red", `Score: ${this.score}`, 100, 40);
    canvas.drawText("30px Consolas", "Red", `Lives: ${this.lives}`, 100, 70);
  }
}
