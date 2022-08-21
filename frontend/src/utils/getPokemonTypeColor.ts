export const getPokemonTypeColor = (color: string) => {
	const POKEMON_TYPE_COLORS: { [color: string]: string } = {
		normal: "gray",
		fighting: "red",
		flying: "indigo",
		poison: "grape",
		ground: "orange",
		rock: "yellow",
		bug: "lime",
		ghost: "violet",
		steel: "gray",
		fire: "red",
		water: "blue",
		grass: "green",
		electric: "yellow",
		psychic: "pink",
		ice: "cyan",
		dragon: "",
		dark: "dark",
		fairy: "pink",
		unknown: "dark",
		shadow: "dark",
	};

	if (!(color in POKEMON_TYPE_COLORS)) {
		console.log("[INFO]: Invalid pokemon type, using default color");
		return "orange";
	}

	return POKEMON_TYPE_COLORS[color];
};
