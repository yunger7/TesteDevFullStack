/* PokeAPI info */
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
		[name: string]: {
			value: number;
			effort: number;
		};
	};
	types: string[];
};

/* User's pokemon information */
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

/* Pokemon info stored in Firestore */
export type PokemonDocument = {
	id: number;
	name: string;
	nickname: string;
	nature?: string;
	hp: number;
	attack: number;
	sp_attack: number;
	sp_defense: number;
	defense: number;
	speed: number;
	level: number;
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
		[name: string]: {
			value: number;
			effort: number;
		};
	};
	types: string[];
};
