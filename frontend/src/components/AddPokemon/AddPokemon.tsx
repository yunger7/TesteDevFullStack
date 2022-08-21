import { useState } from "react";
import { Button } from "@mantine/core";
import { useCounter } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { TbPlus as IconAdd } from "react-icons/tb";

import { SearchPokemonModal } from "./SearchPokemonModal";
import { PokemonInfoModal } from "./PokemonInfoModal";

import { capitalize } from "../../utils/capitalize";

import type { Pokemon, PokemonInfo } from "./types";

export const AddPokemon = () => {
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
		form.reset();
	}

	function savePokemon() {
		console.log(form.values);
		// TODO: Make POST request to backend
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
					reset();
					savePokemon();
				}}
				onButtonCancel={() => {
					handleStep.decrement();
					form.reset();
				}}
			/>
		</>
	);
};
