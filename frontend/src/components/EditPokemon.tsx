import { useState } from "react";
import { Tooltip, ActionIcon } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { TbEdit as IconEdit } from "react-icons/tb";

import { PokemonInfoModal } from "../components/AddPokemon/PokemonInfoModal";
import { useAuth } from "../hooks/useAuth";

import type { PokemonInfo, PokemonDocument } from "../types/pokemon";

type EditPokemonProps = {
	pokemon: PokemonDocument;
	id?: string;
};

export const EditPokemon = ({ id, pokemon }: EditPokemonProps) => {
	const { user } = useAuth();
	const [opened, setOpened] = useState(false);

	const form = useForm<PokemonInfo>({
		initialValues: {
			name: pokemon.name,
			nickname: pokemon.nickname,
			level: pokemon.level,
			nature: pokemon.nature || "Hardy",
			hp: pokemon.hp || 0,
			attack: pokemon.attack || 0,
			defense: pokemon.defense || 0,
			sp_attack: pokemon.sp_attack || 0,
			sp_defense: pokemon.sp_defense || 0,
			speed: pokemon.speed || 0,
		},
	});

	async function handleEdit() {
		try {
			const token = await user?.getIdToken();

			const response = await fetch(
				`${process.env["REACT_APP_API_BASE_PATH"]}/users/${user?.uid}/pokemons/${id}`,
				{
					method: "PUT",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...form.values,
					}),
				}
			);

			const json = await response.json();

			if (!response.ok) {
				throw new Error("Failed to edit pokemon");
			}

			// TODO: Replace reload with a state update
			window.location.reload();
		} catch (error) {
			showNotification({
				title: "Parece que algo deu errado :(",
				message: "Não foi possível editar seu Pokémon",
				color: "red",
			});
		}

		setOpened(false);
	}

	return (
		<>
			<Tooltip label="Editar" position="bottom">
				<ActionIcon variant="default" size="lg" onClick={() => setOpened(true)}>
					<IconEdit size={18} />
				</ActionIcon>
			</Tooltip>
			<PokemonInfoModal
				form={form}
				pokemon={pokemon}
				opened={opened}
				onClose={() => setOpened(false)}
				onButtonConfirm={handleEdit}
				onButtonCancel={() => setOpened(false)}
			/>
		</>
	);
};
