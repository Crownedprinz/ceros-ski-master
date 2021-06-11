import { Service } from "typedi";

@Service()
export default class Sound {
  private sound;
  constructor(src: string) {
    this.sound = document.createElement("audio");
    this.init(src);
    document.body.appendChild(this.sound);
  }

  init(src: string){
      this.sound.src = src;
      this.sound.setAttribute("preload", "auto");
      this.sound.setAttribute("controls", "none");
      this.sound.style.display = "none";
  }
 
  reset(src: string){
      this.init(src);
      this.autoplay();
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