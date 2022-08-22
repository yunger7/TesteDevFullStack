import express from "express";

import { UserController } from "../controllers/UserController";
import { userCredentials } from "../middlewares/userCredentials";

const router = express.Router();

router.use(userCredentials);

router.post("/:userId/pokemons", UserController.postPokemon);

export default router;
