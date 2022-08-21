export type Pokemon = {
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
		name: string;
	}[];
	types: string[];
};

export type PokemonInfo = {
	name: string;
	nickname: string;
	level: number;
	nature: string;
	hp: number;
	attack: number;
	defense: number;
	sp_attack: number;
	sp_defense: number;
	speed: number;
};
