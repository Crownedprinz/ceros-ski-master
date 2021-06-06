export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;

export const SKIER_CRASH = "skierCrash";
export const SKIER_LEFT = "skierLeft";
export const SKIER_LEFTDOWN = "skierLeftDown";
export const SKIER_DOWN = "skierDown";
export const SKIER_RIGHTDOWN = "skierRightDown";
export const SKIER_RIGHT = "skierRight";
export const TREE = "tree";
export const TREE_CLUSTER = "treeCluster";
export const ROCK1 = "rock1";
export const ROCK2 = "rock2";
export const SKIER_UP = "skierUp";
export const JUMP_RAMP = "jumpRamp";
export const RHINO_DEFAULT = "rhinoDefault";
export const RHINO_RUN_LEFT = "rhinoRunLeft";
export const RHINO_LIFT = "rhinoLift";
export const RHINO_LIFT_MOUTH_OPEN = "rhinoLiftMouthOpen";
export const RHINO_LIFT_EAT1 = "rhinoLiftEat1";
export const RHINO_LIFT_EAT2 = "rhinoLiftEat2";
export const RHINO_LIFT_EAT3 = "rhinoLiftEat3";
export const KILL_SKIER = "killSkier";

export const SKIER_STARTING_SPEED = 10;
export const SKIER_DIAGONAL_SPEED_REDUCER = 1.4142;

export const ASSETS = {
  [SKIER_CRASH]: "public/img/skier_crash.png",
  [SKIER_LEFT]: "public/img/skier_left.png",
  [SKIER_LEFTDOWN]: "public/img/skier_left_down.png",
  [SKIER_DOWN]: "public/img/skier_down.png",
  [SKIER_RIGHTDOWN]: "public/img/skier_right_down.png",
  [SKIER_RIGHT]: "public/img/skier_right.png",
  [TREE]: "public/img/tree_1.png",
  [TREE_CLUSTER]: "public/img/tree_cluster.png",
  [ROCK1]: "public/img/rock_1.png",
  [ROCK2]: "public/img/rock_2.png",
  [SKIER_UP]: "public/img/skier_jump_1.png",
  [JUMP_RAMP]: "public/img/jump_ramp.png",
  [RHINO_RUN_LEFT]: "public/img/rhino_run_left.png",
  [RHINO_LIFT]: "public/img/rhino_lift.png",
  [RHINO_LIFT_MOUTH_OPEN]: "public/img/rhino_lift_mouth_open.png",
  [RHINO_LIFT_EAT1]: "public/img/rhino_lift_eat_1.png",
  [RHINO_LIFT_EAT2]: "public/img/rhino_lift_eat_2.png",
  [RHINO_LIFT_EAT3]: "public/img/rhino_lift_eat_3.png",
  [KILL_SKIER]: "public/img/clear_skier.png",
};

export const SKIER_DIRECTIONS = {
  CRASH: 0,
  LEFT: 1,
  LEFT_DOWN: 2,
  DOWN: 3,
  RIGHT_DOWN: 4,
  RIGHT: 5,
  UP: 6,
  KILL: 7,
};

export const SKIER_DIRECTION_ASSET = {
  [SKIER_DIRECTIONS.CRASH]: SKIER_CRASH,
  [SKIER_DIRECTIONS.LEFT]: SKIER_LEFT,
  [SKIER_DIRECTIONS.LEFT_DOWN]: SKIER_LEFTDOWN,
  [SKIER_DIRECTIONS.DOWN]: SKIER_DOWN,
  [SKIER_DIRECTIONS.RIGHT_DOWN]: SKIER_RIGHTDOWN,
  [SKIER_DIRECTIONS.RIGHT]: SKIER_RIGHT,
  [SKIER_DIRECTIONS.UP]: SKIER_UP,
  [SKIER_DIRECTIONS.KILL]: KILL_SKIER,
};

export const KEYS = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
};

export const RHINO_ACTIONS = {
  CHASE_SKIER: 0,
  LIFT_SKIER: 1,
  LIFT_MOUTH_OPEN_SKIER: 2,
  CHEW_SKIER: 3,
  SWALLOW_SKIER: 4,
  END: 5,
};

export const RHINO_ACTION_ASSET = {
  [RHINO_ACTIONS.CHASE_SKIER]: RHINO_RUN_LEFT,
  [RHINO_ACTIONS.LIFT_SKIER]: RHINO_LIFT,
  [RHINO_ACTIONS.LIFT_MOUTH_OPEN_SKIER]: RHINO_LIFT_MOUTH_OPEN,
  [RHINO_ACTIONS.CHEW_SKIER]: RHINO_LIFT_EAT1,
  [RHINO_ACTIONS.SWALLOW_SKIER]: RHINO_LIFT_EAT2,
  [RHINO_ACTIONS.END]: RHINO_LIFT_EAT3,
};
