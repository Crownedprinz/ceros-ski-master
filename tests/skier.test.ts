import "babel-polyfill";
import Skier from "../src/services/skierService";

describe("Skier should move in this direction", () => {
  let skier: Skier,
    exp_left: number,
    exp_right: number,
    left_speed: number,
    right_speed: number,
    exp_down: number,
    jump,
    left_down,
    right_down,
    rock,
    skier_down,
    skier_up;
  beforeEach(() => {
    skier = new Skier(0, 0);
    exp_left = 1;
    exp_right = 5;
    exp_down = 3;
    jump = 6;
    left_speed = -10;
    right_speed = 10;
    left_down = 2;
    right_down = 4;
    rock = "rock1";
    skier_down = "skierDown";
    skier_up = "skierUp";
  });

  test("left arrow button is pressed and faces left direction", () => {
    skier.turnLeft();
    expect(skier.direction).toBe(exp_left);
  });

  test("right arrow button is pressed and faces right direction", () => {
    skier.turnRight();
    expect(skier.direction).toBe(exp_right);
  });

  test("down arrow button is pressed and faces down direction", () => {
    skier.turnDown();
    expect(skier.direction).toBe(exp_down);
  });
  test("up arrow button is pressed and should jump", () => {
    skier.turnUp();
    skier.move();
    expect(skier.direction).toBe(jump);
  });

  test("move  diagonal towards the down left when left and down is pressed", () => {
    skier.turnLeftDown();
    expect(skier.direction).toBe(left_down);
  });

  test("move diagonal towards the down right when right and down is pressed", () => {
    skier.turnRightDown();
    expect(skier.direction).toBe(right_down);
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

  test("skier hits a rock and crash", () => {
    skier.CheckIfSkierShouldJump(rock);
    expect(skier.assetName).toBe(skier_down);
  });

  test("skier hits a rock and jumps", () => {
    skier.turnUp();
    skier.setSkierJumpOverRock(rock);
    expect(skier.assetName).toBe(skier_up);
  });
});
