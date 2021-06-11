import Audio from "mock-audio-element"

describe("Audio Element checks",()=>{
    let audio;
    beforeEach(()=>{
        audio = new Audio("https://github.com/Crownedprinz/ceros-ski-master/blob/24e053ecacd9443b40d3657b08b1b0955249f05e/public/sounds/background.mp3");
    })

    it("check if audio is on autoplay", ()=>{
        audio.autoplay = true;
        expect(audio.autoplay).toBe(true);
    })
     it("check if audio is on autoplay is off", () => {
       audio.autoplay = false;
       expect(audio.autoplay).toBe(false);
     });

     it("check if you can pause a sound and continue",()=>{
            expect(audio.paused).toBe(true);
            audio.paused = !audio.paused;
             expect(audio.paused).toBe(false);
     })
})