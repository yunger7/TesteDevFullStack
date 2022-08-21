import { Button, Container, Text } from "@mantine/core";
import { TbPlus as IconAdd } from "react-icons/tb";

import { SubHeader } from "../components/SubHeader";

export const Home = () => {
	return (
		<>
			<SubHeader title="Meus pokémons">
				<Button leftIcon={<IconAdd size={18} />}>Adicionar</Button>
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
