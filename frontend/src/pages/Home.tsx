import { Container, Text } from "@mantine/core";

import { SubHeader } from "../components/SubHeader";
import { AddPokemon } from "../components/AddPokemon";

export const Home = () => {
	return (
		<>
			<SubHeader title="Meus pokémons">
				<AddPokemon />
			</SubHeader>
			<Container size="xl" py="xl" mt="xl">
				<Text color="dimmed" align="center">
					{"(っ °Д °;)っ"}
					<br />
					Você ainda não possui nenhum Pokémon registrado!
				</Text>
			</Container>
		</>
	);
};
