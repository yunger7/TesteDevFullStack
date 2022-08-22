import axios from "axios";
import type { Request, Response } from "express";
import type { Pokemon } from "../types/Pokemon";

const POKEAPI_BASE_PATH = "https://pokeapi.co/api/v2/";

async function get(req: Request, res: Response) {
	try {
		const { name } = req.params;

		const { data } = await axios.get<Pokemon>(
			`${POKEAPI_BASE_PATH}/pokemon/${name}`
		);

		res.json({
			id: data.id,
			name: data.name,
			height: data.height,
			weight: data.weight,
			sprites: {
				back_default: data.sprites.back_default,
				back_female: data.sprites.back_female,
				back_shiny: data.sprites.back_shiny,
				back_shiny_female: data.sprites.back_shiny_female,
				front_default: data.sprites.front_default,
				front_female: data.sprites.front_female,
				front_shiny: data.sprites.front_shiny,
				front_shiny_female: data.sprites.front_shiny_female,
			},
			stats: data.stats.map(item => ({
				base_stat: item.base_stat,
				effort: item.effort,
				name: item.stat.name,
			})),
			types: data.types.map(item => item.type.name),
		});
	} catch (error) {
		res.status(404).json({ message: "Pokemon not found" });
	}
}

export const PokemonController = {
	get,
};
