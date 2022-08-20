import { Center, createStyles, useMantineTheme } from "@mantine/core";

const useStyles = createStyles({
	small: {
		width: 100,
		height: 100,
		borderRadius: 25,
	},

	medium: {
		width: 150,
		height: 150,
		borderRadius: 37.5,
	},

	large: {
		width: 175,
		height: 175,
		borderRadius: 50,
	},
});

type PokeShowcaseProps = {
	pokemon: string;
	size?: "small" | "medium" | "large";
};

export const PokeShowcase = (props: PokeShowcaseProps) => {
	const { pokemon, size = "medium" } = props;

	const { classes } = useStyles();
	const theme = useMantineTheme();

	return (
		<Center
			className={classes[size]}
			sx={{
				background:
					theme.colorScheme === "light" ? theme.white : theme.colors.dark["6"],
				boxShadow: `8px 8px 28px ${
					theme.colorScheme === "light" ? "#bfbfbf" : "#141417"
				}, -8px -8px 28px ${
					theme.colorScheme === "light" ? "#ffffff" : "#212226"
				}`,
			}}
		>
			<img src={pokemon} alt="pokemon" />
		</Center>
	);
};
