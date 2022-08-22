import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

import type { PokemonDocument } from "../types/pokemon";

type PokemonList = Array<PokemonDocument & { docId: string }>;

export const usePokemonList = () => {
	const { user } = useAuth();

	const [pokemons, setPokemons] = useState<PokemonList>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (!user) return;
		const abortController = new AbortController();

		async function fetchPokemon() {
			setLoading(true);

			try {
				const token = await user?.getIdToken();

				const response = await fetch(
					`${process.env["REACT_APP_API_BASE_PATH"]}/users/${user?.uid}/pokemons`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
						signal: abortController.signal,
					}
				);

				if (!response.ok) {
					setError(true);
					throw new Error("Failed to fetch pokemons");
				}

				const { data } = await response.json();

				setPokemons(data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		fetchPokemon();

		return () => abortController.abort();
	}, [user]);

	return {
		pokemons,
		loading,
		error,
	};
};
