import {
	Header as MantineHeader,
	Container,
	createStyles,
} from "@mantine/core";
import { Logo } from "./Logo";

const useStyles = createStyles(theme => ({
	header: {
		width: "100%",
		backfaceVisibility: "hidden",
		backdropFilter: "saturate(180%) blur(5px)",
		backgroundColor: theme.fn.rgba(
			theme.colorScheme === "light" ? theme.white : theme.black,
			theme.colorScheme === "light" ? 0.8 : 0.5
		),
	},

	container: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		height: "100%",
	},
}));

export const Header = () => {
	const { classes } = useStyles();

	return (
		<MantineHeader className={classes.header} height={60} p="xs">
			<Container className={classes.container} size="xl">
				<Logo />
			</Container>
			{/* TODO: If signed in, show user avatar. */}
		</MantineHeader>
	);
};
