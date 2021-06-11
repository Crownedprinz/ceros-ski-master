import "babel-polyfill"
import Rhino from "../src/services/rhinoService";
import Skier from "../src/services/skierService";

describe("Rhino Tests",()=>{
     let rhino,
       skier,
       left_speed,
       right_speed,
       up_speed,
       down_speed,
       starting_distance,
       kill_skier,
       rhino_lift,
       exit_skier,
       rhino_lift_skier;

  beforeEach(() => {
    rhino = new Rhino(0, 0);
    skier = new Skier(0, 0);
    left_speed = 10;
    right_speed = 20;
    up_speed = -3000;
    down_speed = -3000;
    starting_distance = 3000;
    kill_skier = 'killSkier';
    exit_skier = 7;
    rhino_lift = 'rhinoLift';
    rhino_lift_skier = 1
  })
    test("rhino should run after skier while skier is running to the left", () => {
      skier.turnLeft();
      skier.y = starting_distance;
      rhino.move(skier);
      expect(rhino.x).toBe(left_speed);
    });

    test("rhino should run after skier while skier is running to the right", () => {
      skier.turnRight();
      skier.y = starting_distance;
      rhino.move(skier);
      expect(rhino.x).toBe(right_speed);
    });

    test("rhino should run after skier while skier is running downwards", () => {
      skier.turnDown();
      skier.y = starting_distance;
      rhino.move(skier);
      expect(rhino.x).toBe(down_speed);
    });

  test("rhino should grab skier", () => {
    rhino.action = rhino_lift_skier;
    rhino.setAction(rhino.action);
    expect(rhino.assetName).toBe(rhino_lift);
    rhino.updateAction(skier);
    expect(rhino.assetName).toBe(rhino_lift);
  });

  test("kill skier after skier collides with rhino", () => {
    rhino.removeSkier(skier);
    expect(skier.direction).toBe(exit_skier);
    expect(skier.y).toBe(rhino.y);
    expect(skier.x).toBe(rhino.x);
    expect(skier.assetName).toBe(kill_skier);
  });
})