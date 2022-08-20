import { Link } from "react-router-dom";
import { Group, Text, ActionIcon, useMantineColorScheme } from "@mantine/core";
import { TbPokeball as IconPokeball } from "react-icons/tb";

export const Logo = () => {
	const { colorScheme } = useMantineColorScheme();

	return (
		<Group spacing={5}>
			<ActionIcon
				component={Link}
				to="/"
				variant="transparent"
				color={colorScheme === "dark" ? "gray" : "dark"}
				size="lg"
			>
				<IconPokeball size={32} />
			</ActionIcon>
			<Text weight={700} size="lg">
				CRUDmon
			</Text>
		</Group>
	);
};
