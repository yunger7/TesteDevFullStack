import { db } from "../services/firebase";

import type { Request, Response } from "express";

async function postPokemon(req: Request, res: Response) {
	try {
		const pokemonInfo = req.body;

		// TODO: Validate request

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
			id: document.id,
			data: {
				...pokemonInfo,
			},
		});
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Failed to save pokmemon to database" });
	}
}

async function getPokemon(req: Request, res: Response) {
	try {
		const pokemonId = req.params.pokemonId;

		// TODO: Validate request

		if (req.credentials?.uid !== req.params.userId) {
			return res
				.status(403)
				.json({ message: "User ID does not match ID provided in params" });
		}

		const document = await db
			.collection("users")
			.doc(req.credentials?.uid)
			.collection("pokemons")
			.doc(pokemonId)
			.get();

		if (!document.exists) {
			return res.status(404).json({ message: "Pokemon not found" });
		}

		return res.json({
			message: "Pokemon retrieved successfully",
			data: document.data(),
		});
	} catch (error) {
		return res.status(500).json({ message: "Failed to get pokemon" });
	}
}

export const UserController = {
	postPokemon,
	getPokemon,
};
