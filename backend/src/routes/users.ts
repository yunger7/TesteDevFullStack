import express from "express";

import { UserController } from "../controllers/UserController";
import { userCredentials } from "../middlewares/userCredentials";

const router = express.Router();

router.use(userCredentials);

router.get("/:userId/pokemons", UserController.getPokemonList);
router.get("/:userId/pokemons/:pokemonId", UserController.getPokemon);
router.post("/:userId/pokemons", UserController.postPokemon);
router.delete("/:userId/pokemons/:pokemonId", UserController.deletePokemon);
router.put("/:userId/pokemons/:pokemonId", UserController.editPokemon);

export default router;
