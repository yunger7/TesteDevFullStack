import { useState, useEffect, forwardRef } from "react";
import {
	Modal,
	Autocomplete,
	Group,
	Button,
	Avatar,
	Text,
	Badge,
	Loader,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";

import {
	TbPokeball as IconPokeball,
	TbSearch as IconSearch,
} from "react-icons/tb";

import { capitalize } from "../../utils/capitalize";
import { getPokemonTypeColor } from "../../utils/getPokemonTypeColor";

import type { SelectItemProps } from "@mantine/core";
import type { Pokemon } from "../../types/pokemon";

type PokemonData = Pokemon & {
	value: string;
};

type SearchModalProps = {
	opened: boolean;
	onClose: () => void;
	onButtonCancel: () => void;
	onButtonConfirm: (pokemon: Pokemon) => void;
};

export const SearchPokemonModal = (props: SearchModalProps) => {
	const { opened, onClose, onButtonConfirm, onButtonCancel } = props;

	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 1000);
	const [data, setData] = useState<PokemonData[]>([]);
	const [loading, setLoading] = useState(false);
	const [isValid, setIsValid] = useState<boolean>();

	useEffect(() => setIsValid(undefined), [searchQuery]);

	useEffect(() => {
		if (!debouncedSearchQuery) return;

		const abortController = new AbortController();

		async function fetchPokemonData() {
			try {
				setLoading(true);
				setIsValid(undefined);

				const response = await fetch(
					`${
						process.env["REACT_APP_API_BASE_PATH"]
					}/pokemons/${debouncedSearchQuery.toLowerCase()}`,
					{ signal: abortController.signal }
				);

				const pokemon = (await response.json()) as Pokemon;

				if (!("name" in pokemon)) {
					throw new Error("Pokemon not found");
				}

				setData([{ value: pokemon.name, ...pokemon }]);
				setIsValid(true);
			} catch (error) {
				console.log(error);
				setIsValid(false);
				setData([]);
			} finally {
				setLoading(false);
			}
		}

		fetchPokemonData();

		return () => {
			abortController.abort();
			setLoading(false);
		};
	}, [debouncedSearchQuery]);

	return (
		<Modal
			centered
			size="lg"
			transition="slide-up"
			transitionDuration={500}
			overlayOpacity={0.35}
			title="Adicionar pokémon"
			closeButtonLabel="Fechar"
			opened={opened}
			onClose={onClose}
		>
			<Autocomplete
				withAsterisk
				label="Nome do pokémon"
				placeholder="Articuno, Mew, Pikachu, etc."
				icon={loading ? <Loader size="xs" /> : <IconSearch />}
				data={data}
				value={searchQuery}
				onChange={setSearchQuery}
				error={isValid === false ? "Pokémon não encontrado" : undefined}
				itemComponent={AutocompleteItem}
			/>
			<Group position="right" mt="lg">
				<Button variant="default" onClick={onButtonCancel}>
					Cancelar
				</Button>
				<Button
					disabled={isValid !== true}
					onClick={() => onButtonConfirm(data[0])}
				>
					Continuar
				</Button>
			</Group>
		</Modal>
	);
};

type ItemProps = PokemonData & SelectItemProps;

const AutocompleteItem = forwardRef<HTMLDivElement, ItemProps>(
	({ value: name, sprites, types, ...others }: ItemProps, ref) => (
		<div ref={ref} {...others}>
			<Group noWrap spacing="xs">
				<Avatar src={sprites.front_default} alt={name} size="lg">
					<IconPokeball size={32} />
				</Avatar>
				<div>
					<Text size="md" weight={600} sx={{ marginBottom: 4 }}>
						{capitalize(name)}
					</Text>
					<Group spacing={4}>
						{types.map(type => (
							<Badge color={getPokemonTypeColor(type)} key={type}>
								{type}
							</Badge>
						))}
					</Group>
				</div>
			</Group>
		</div>
	)
);
