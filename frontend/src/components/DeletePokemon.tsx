import { useNavigate } from "react-router-dom";
import { Tooltip, ActionIcon, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { TbTrash as IconDelete } from "react-icons/tb";

import { useAuth } from "../hooks/useAuth";

type DeletePokemonProps = {
	id?: string;
};

export const DeletePokemon = ({ id }: DeletePokemonProps) => {
	const navigate = useNavigate();
	const { user } = useAuth();

	function showModal() {
		openConfirmModal({
			title: "Excluir pokémon",
			children: (
				<Text size="sm">
					Tem certeza que deseja excluir esse pokémon? Essa ação não pode ser
					desfeita.
				</Text>
			),
			confirmProps: { color: "red" },
			onConfirm: handleDelete,
		});
	}

	async function handleDelete() {
		try {
			const token = await user?.getIdToken();

			const response = await fetch(
				`${process.env["REACT_APP_API_BASE_PATH"]}/users/${user?.uid}/pokemons/${id}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error("Failed to delete pokemon");
			}

			navigate("/");
		} catch (error) {
			console.log(error);
			showNotification({
				title: "Parece que algo deu errado :(",
				message: "Não foi possível excluir seu Pokémon",
				color: "red",
			});
		}
	}

	return (
		<Tooltip label="Excluir" position="bottom">
			<ActionIcon variant="default" size="lg" onClick={showModal}>
				<IconDelete size={18} />
			</ActionIcon>
		</Tooltip>
	);
};
