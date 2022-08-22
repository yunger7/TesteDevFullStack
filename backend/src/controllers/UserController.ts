import { db } from "../services/firebase";

import type { Request, Response } from "express";
import type { PokemonInfo } from "../types/Pokemon";

async function postPokemon(req: Request, res: Response) {
	try {
		const pokemonInfo: PokemonInfo = req.body;

		// TODO: Validate request before saving to database

		if (req.credentials?.uid !== req.params.userId) {
			return res
				.status(403)
				.json({ message: "User ID does not match ID provided in params" });
		}

		const document = await db
			.collection("users")
			.doc(req.credentials?.uid)
			.collection("pokemons")
			.add(pokemonInfo);

		return res.json({
			message: "Pokemon added successfully",
			data: {
				id: document.id,
				...pokemonInfo,
			},
		});
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Failed to save pokmemon to database" });
	}
}

export const UserController = {
	postPokemon,
};
