import { Service } from "typedi";
import * as Constants from "../constants/consts"

@Service()
export default class Canvas {
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  drawOffset: any = {
    x: 0,
    y: 0,
  };
  ctx: any = null;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.createCanvas();
  }

  restartCanvas(){
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.drawOffset = {
      x: 0,
      y: 0,
    };
    this.ctx = null;
    this.width = Constants.GAME_WIDTH;
    this.height  = Constants.GAME_HEIGHT;
  }

  createCanvas() {
    const canvas = document.createElement("canvas");
    canvas.id = "skiCanvas";
    canvas.width = this.width * window.devicePixelRatio;
    canvas.height = this.height * window.devicePixelRatio;
    canvas.style.width = this.width + "px";
    canvas.style.height = this.height + "px";

    this.ctx = canvas.getContext("2d");
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    document.body.appendChild(canvas);
  }

  clearCanvas() {
    this.ctx.clearRect(this.x, this.y, this.width, this.height);
  }

  setDrawOffset(x: number, y: number) {
    this.drawOffset.x = x;
    this.drawOffset.y = y;
  }

  drawImage(image: any, x: number, y: number, width: number, height: number) {
    x -= this.drawOffset.x;
    y -= this.drawOffset.y;

    this.ctx.drawImage(image, x, y, width, height);
  }

  drawText(font: string, color: string, text: string, x:number, y:number){
    this.ctx.font = font;
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, x,y);
  }
}
