import * as Constants from '../constants/consts';
import { randomInt } from '../utilities/utils';
import { Obstacle } from "../models/obstacle";
import { Service } from 'typedi';
import Canvas from '../loaders/canvas';
import AssetManager from '../loaders/assetManager';

const DISTANCE_BETWEEN_OBSTACLES = 50;
const STARTING_OBSTACLE_GAP = 100;
const STARTING_OBSTACLE_REDUCER = 300;
const NEW_OBSTACLE_CHANCE = 8;

@Service()
export default class ObstacleManager {
  obstacles: any = [];

  constructor(private assetManager: AssetManager) {}

  restartObstacle() {
    this.obstacles = [];
  }
  getObstacles() {
    return this.obstacles;
  }

  drawObstacles(canvas: Canvas) {
    this.obstacles.forEach((obstacle) => {
      obstacle.draw(canvas, this.assetManager);
    });
  }

  placeInitialObstacles() {
    const numberObstacles = Math.ceil(
      (Constants.GAME_WIDTH / STARTING_OBSTACLE_REDUCER) *
        (Constants.GAME_HEIGHT / STARTING_OBSTACLE_REDUCER)
    );

    const minX = -Constants.GAME_WIDTH / 2;
    const maxX = Constants.GAME_WIDTH / 2;
    const minY = STARTING_OBSTACLE_GAP;
    const maxY = Constants.GAME_HEIGHT / 2;

    for (let i = 0; i < numberObstacles; i++) {
      this.placeRandomObstacle(minX, maxX, minY, maxY);
    }

    this.obstacles.sort((obstacle1, obstacle2) => {
      return obstacle1.getPosition().y - obstacle2.getPosition().y;
    });
  }

  placeNewObstacle(gameWindow: any, previousGameWindow: any) {
    const shouldPlaceObstacle = randomInt(1, NEW_OBSTACLE_CHANCE);
    if (shouldPlaceObstacle !== NEW_OBSTACLE_CHANCE) {
      return;
    }

    if (gameWindow.left < previousGameWindow.left) {
      this.placeObstacleLeft(gameWindow);
    } else if (gameWindow.left > previousGameWindow.left) {
      this.placeObstacleRight(gameWindow);
    }

    if (gameWindow.top < previousGameWindow.top) {
      this.placeObstacleTop(gameWindow);
    } else if (gameWindow.top > previousGameWindow.top) {
      this.placeObstacleBottom(gameWindow);
    }
  }

  placeObstacleLeft(gameWindow: any) {
    this.placeRandomObstacle(
      gameWindow.left,
      gameWindow.left,
      gameWindow.top,
      gameWindow.bottom
    );
  }

  placeObstacleRight(gameWindow: any) {
    this.placeRandomObstacle(
      gameWindow.right,
      gameWindow.right,
      gameWindow.top,
      gameWindow.bottom
    );
  }

  placeObstacleTop(gameWindow: any) {
    this.placeRandomObstacle(
      gameWindow.left,
      gameWindow.right,
      gameWindow.top,
      gameWindow.top
    );
  }

  placeObstacleBottom(gameWindow: any) {
    this.placeRandomObstacle(
      gameWindow.left,
      gameWindow.right,
      gameWindow.bottom,
      gameWindow.bottom
    );
  }

  placeRandomObstacle(minX: number, maxX: number, minY: number, maxY: number) {
    const position = this.calculateOpenPosition(minX, maxX, minY, maxY);
    const newObstacle = new Obstacle(position.x, position.y);

    this.obstacles.push(newObstacle);
  }

  calculateOpenPosition(
    minX: number,
    maxX: number,
    minY: number,
    maxY: number
  ) {
    const x = randomInt(minX, maxX);
    const y = randomInt(minY, maxY);

    const foundCollision = this.obstacles.find((obstacle) => {
      return (
        x > obstacle.x - DISTANCE_BETWEEN_OBSTACLES &&
        x < obstacle.x + DISTANCE_BETWEEN_OBSTACLES &&
        y > obstacle.y - DISTANCE_BETWEEN_OBSTACLES &&
        y < obstacle.y + DISTANCE_BETWEEN_OBSTACLES
      );
    });

    if (foundCollision) {
      return this.calculateOpenPosition(minX, maxX, minY, maxY);
    } else {
      return {
        x: x,
        y: y,
      };
    }
  }
}