import express from "express";
import { PokemonController } from "../controllers/PokemonController";

const router = express.Router();

router.get("/:name", PokemonController.get);

export default router;
