import { Link } from "react-router-dom";
import {
	Card,
	Image,
	Group,
	Text,
	Badge,
	Center,
	Skeleton,
} from "@mantine/core";
import { TbPokeball as IconPokeball } from "react-icons/tb";

import { getPokemonTypeColor } from "../utils/getPokemonTypeColor";

import type { PokemonDocument } from "../types/pokemon";

type PokeCardProps = {
	pokemon?: PokemonDocument & { docId: string };
};

export const PokeCard = ({ pokemon }: PokeCardProps) => {
	if (!pokemon) {
		return <Skeleton animate width="100%" height={300} />;
	}

	return (
		<Card
			withBorder
			component={Link}
			to={`/pokemon/${pokemon.docId}`}
			sx={theme => ({
				transition: "all 200ms ease",

				"&:hover": {
					boxShadow: theme.shadows.md,
				},
			})}
		>
			<Card.Section>
				<Image
					withPlaceholder
					fit="contain"
					src={pokemon.sprites.front_default}
					alt={pokemon.name}
					placeholder={<Placeholder />}
					styles={{
						image: { maxHeight: 256 },
					}}
				/>
			</Card.Section>
			<Group position="apart" sx={{ alignItems: "flex-start" }}>
				<Text weight={600} size="lg">
					{pokemon.nickname}
				</Text>
				<Text color="dimmed" size="sm">
					Level {pokemon.level || "???"}
				</Text>
			</Group>
			<Group my="sm" spacing="xs" sx={{ flex: 1 }}>
				{pokemon.types.map(type => (
					<Badge color={getPokemonTypeColor(type)} key={type}>
						{type}
					</Badge>
				))}
			</Group>
		</Card>
	);
};

const Placeholder = () => {
	return (
		<Center sx={{ flexDirection: "column" }}>
			<IconPokeball size={64} />
			<Text align="center">Imagem não encontrada</Text>
		</Center>
	);
};
