import { Service } from "typedi";

@Service()
export default class Sound {
  private sound;
  constructor(src: string) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
  }

 

  play() {
    this.sound.play();
  }
  stop() {
    this.sound.pause();
  }
  autoplay(){
    this.sound.setAttribute("autoplay", "true");
    this.sound.setAttribute("muted", "true");
  }
}