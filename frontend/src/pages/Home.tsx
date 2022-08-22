import { Container, Text, Center, Loader, SimpleGrid } from "@mantine/core";

import { SubHeader } from "../components/SubHeader";
import { AddPokemon } from "../components/AddPokemon";
import { PokeCard } from "../components/PokeCard";

import { usePokemonList } from "../hooks/usePokemonList";

export const Home = () => {
	const { pokemons, loading, error } = usePokemonList();

	return (
		<>
			<SubHeader title="Meus pokémons">
				<AddPokemon />
			</SubHeader>
			<Container size="xl" py="xl" mt="xl">
				{loading ? (
					<Center sx={{ flexDirection: "column" }}>
						<Loader variant="bars" />
						<Text mt="md" color="dimmed" align="center">
							Buscando as informações...
						</Text>
					</Center>
				) : pokemons ? (
					<>
						{pokemons.length ? (
							<SimpleGrid cols={4}>
								{pokemons.map((pokemon, i) => (
									<PokeCard pokemon={pokemon} key={i} />
								))}
							</SimpleGrid>
						) : (
							<Text color="dimmed" align="center">
								{"(っ °Д °;)っ"}
								<br />
								Você ainda não possui nenhum Pokémon registrado!
							</Text>
						)}
					</>
				) : (
					<>
						{error && (
							<Center>
								<Text color="dimmed" align="center">
									{"(╯°□°）╯︵ ┻━┻"}
									<br />
									Wops! Não foi possível buscar seus pokémons
								</Text>
							</Center>
						)}
					</>
				)}
			</Container>
		</>
	);
};
