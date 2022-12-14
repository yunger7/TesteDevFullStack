import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { useCounter } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { TbPlus as IconAdd } from "react-icons/tb";

import { SearchPokemonModal } from "./SearchPokemonModal";
import { PokemonInfoModal } from "./PokemonInfoModal";

import { useAuth } from "../../hooks/useAuth";
import { capitalize } from "../../utils/capitalize";

import type { Pokemon, PokemonInfo } from "../../types/pokemon";

export const AddPokemon = () => {
	const navigate = useNavigate();
	const { user } = useAuth();

	const [step, handleStep] = useCounter(0, { min: 0, max: 2 });
	const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();

	const form = useForm<PokemonInfo>({
		initialValues: {
			name: "",
			nickname: "",
			level: 1,
			nature: "Hardy",
			hp: 0,
			attack: 0,
			defense: 0,
			sp_attack: 0,
			sp_defense: 0,
			speed: 0,
		},
	});

	function selectPokemon(pokemon?: Pokemon) {
		form.reset();
		setSelectedPokemon(pokemon);
		form.setFieldValue("name", pokemon?.name || "");
		form.setFieldValue("nickname", pokemon ? capitalize(pokemon.name) : "");
		handleStep.increment();
	}

	function reset() {
		handleStep.reset();
		setSelectedPokemon(undefined);
	}

	async function savePokemon() {
		try {
			const token = await user?.getIdToken();

			const response = await fetch(
				`${process.env["REACT_APP_API_BASE_PATH"]}/users/${user?.uid}/pokemons`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...selectedPokemon,
						...form.values,
						nickname: form.values.nickname || capitalize(form.values.name),
					}),
				}
			);

			const { id } = await response.json();

			if (id) {
				navigate(`/pokemon/${id}`);
			}
		} catch (error) {
			showNotification({
				title: "Parece que algo deu errado :(",
				message: "N??o foi poss??vel cadasrar seu Pok??mon",
				color: "red",
			});
		}
	}

	return (
		<>
			<Button
				leftIcon={<IconAdd size={18} />}
				onClick={() => handleStep.set(1)}
			>
				Adicionar
			</Button>
			<SearchPokemonModal
				opened={step === 1}
				onClose={reset}
				onButtonConfirm={selectPokemon}
				onButtonCancel={reset}
			/>
			<PokemonInfoModal
				form={form}
				pokemon={selectedPokemon}
				opened={step === 2}
				onClose={reset}
				onButtonConfirm={() => {
					savePokemon();
					handleStep.reset();
				}}
				onButtonCancel={() => handleStep.decrement()}
			/>
		</>
	);
};
