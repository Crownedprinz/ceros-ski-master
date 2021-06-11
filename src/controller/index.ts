import "../../public/css/game.css";
import "reflect-metadata";
import Container from "typedi";

import GameService from "../services/gameService";

const startGame = async () => {
  const gameService = Container.get(GameService);
  gameService.load().then(() => {

    gameService.init();
    gameService.run();
  });

  console.log("Game started");
};

startGame().catch((err) => {
  console.error(err);
});
