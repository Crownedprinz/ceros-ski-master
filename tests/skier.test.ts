import "babel-polyfill";
import Skier from "../src/services/skierService";

describe("Skier should move in this direction", () => {
    let skier : Skier;
    let exp_left: number
    let  exp_right: number
    let  left_speed: number
    let  right_speed: number
  beforeEach(() => {
    skier = new Skier(0, 0);
    exp_left = 1;
    exp_right = 5;
    left_speed = -10;
    right_speed = 10;
  });

  test("left arrow button is pressed and faces left direction", () => {
    skier.turnLeft();
    expect(skier.direction).toBe(exp_left);
  });

  test("right arrow button is pressed and faces right direction", () => {
    skier.turnRight();
    expect(skier.direction).toBe(exp_right);
  });

  test("left should move towards the left continuously", () => {
    skier.turnLeft();
    skier.move();
    expect(skier.x).toBe(left_speed);
  });

  test("right should move towards the right continuously", () => {
    skier.turnRight();
    skier.move();
    expect(skier.x).toBe(right_speed);
  });


});
