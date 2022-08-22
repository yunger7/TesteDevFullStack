import { db } from "../services/firebase";

import type { QuerySnapshot } from "firebase-admin/firestore";
import type { Request, Response } from "express";
import type { Pokemon, PokemonDocument } from "../types/Pokemon";

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

type PokemonList = Array<{ docId: string } & PokemonDocument>;

async function getPokemonList(req: Request, res: Response) {
	try {
		// TODO: Validate request

		if (req.credentials?.uid !== req.params.userId) {
			return res
				.status(403)
				.json({ message: "User ID does not match ID provided in params" });
		}

		const snapshot = (await db
			.collection("users")
			.doc(req.credentials?.uid)
			.collection("pokemons")
			.get()) as QuerySnapshot<PokemonDocument>;

		const pokemonList: PokemonList = [];

		snapshot.forEach(doc => {
			pokemonList.push({
				docId: doc.id,
				...doc.data(),
			});
		});

		return res.json({
			message: "Pokemon list retrieved successfully",
			data: pokemonList,
		});
	} catch (error) {
		return res.status(500).json({ message: "Failed to get pokemon list" });
	}
}

async function deletePokemon(req: Request, res: Response) {
	try {
		// TODO: Validate request

		if (req.credentials?.uid !== req.params.userId) {
			return res
				.status(403)
				.json({ message: "User ID does not match ID provided in params" });
		}

		await db
			.collection("users")
			.doc(req.credentials?.uid)
			.collection("pokemons")
			.doc(req.params.pokemonId)
			.delete();

		return res.json({
			message: "Pokemon deleted successfully",
		});
	} catch (error) {
		return res.status(500).json({ message: "Failed to delete pokemon" });
	}
}

export const UserController = {
	postPokemon,
	getPokemon,
	getPokemonList,
	deletePokemon,
};
