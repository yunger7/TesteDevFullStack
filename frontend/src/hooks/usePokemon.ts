import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

type Pokemon = {
	id: number;
	name: string;
	nickname: string;
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
		base_stat: number;
		effort: number;
		name: string;
	}[];
	types: string[];
};

export const usePokemon = (id?: string) => {
	const { user } = useAuth();

	const [pokemon, setPokemon] = useState<Pokemon>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (!user || !id) return;
		const abortController = new AbortController();

		async function fetchPokemon() {
			setLoading(true);

			try {
				const token = await user?.getIdToken();

				const response = await fetch(
					`${process.env["REACT_APP_API_BASE_PATH"]}/users/${user?.uid}/pokemons/${id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
						signal: abortController.signal,
					}
				);

				if (!response.ok) {
					setError(true);
					throw new Error("Failed to fetch pokemon");
				}

				const { data } = await response.json();

				setPokemon(data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		fetchPokemon();

		return () => abortController.abort();
	}, [user, id]);

	return {
		pokemon,
		loading,
		error,
	};
};
