import "dotenv/config";
import express from "express";
import axios from "axios";
import cors from "cors";

const PORT = process.env["PORT"] || 5000;
const POKEAPI_BASE_PATH = "https://pokeapi.co/api/v2/";

const app = express();
app.use(cors());

type Pokemon = {
	id: number;
	name: string;
	height: number;
	weight: number;
	sprites: {
		back_default?: string;
		back_female?: string;
		back_shiny?: string;
		back_shiny_female?: string;
		front_default?: string;
		front_female?: string;
		front_shiny?: string;
		front_shiny_female?: string;
	};
	stats: {
		base_stat: number;
		effort: number;
		stat: { name: string; url: string };
	}[];
	types: { slot: number; type: { name: string; url: string } }[];
};

app.get("/api/pokemons/:name", async (req, res) => {
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
});

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}`);
});
