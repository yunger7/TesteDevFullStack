import { Text, Group, Stack, Paper, useMantineTheme } from "@mantine/core";
import type { IconType } from "react-icons";

type PokeStatProps = {
	name: string;
	value?: string | number;
	icon: IconType;
	withColor?: boolean;
};

export const PokeStat = (props: PokeStatProps) => {
	const { name, value, icon: Icon, withColor } = props;

	const theme = useMantineTheme();

	return (
		<Paper withBorder p="sm">
			<Group>
				<Icon
					size={48}
					color={
						withColor
							? theme.colorScheme === "dark"
								? theme.colors.orange[8]
								: theme.colors.orange[6]
							: undefined
					}
				/>
				<Stack spacing={0}>
					<Text size="xs" weight={600}>
						{name.toUpperCase()}
					</Text>
					<Text size="xl">{value || "0"}</Text>
				</Stack>
			</Group>
		</Paper>
	);
};
