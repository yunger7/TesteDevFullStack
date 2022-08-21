import { Box, Container, Title, createStyles } from "@mantine/core";
import type { ReactNode } from "react";

const useStyles = createStyles(theme => ({
	root: {
		backgroundColor:
			theme.colorScheme === "dark"
				? theme.colors.dark[8]
				: theme.colors.gray[0],
		height: "calc(var(--mantine-header-height) * 1.5)",
		borderBottom: `1px solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
		}`,
	},

	container: {
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
}));

type SubHeaderProps = {
	title: string;
	children?: ReactNode;
};

export const SubHeader = (props: SubHeaderProps) => {
	const { title, children } = props;

	const { classes } = useStyles();

	return (
		<Box className={classes.root}>
			<Container className={classes.container} size="xl">
				<Title order={2}>{title}</Title>
				{children}
			</Container>
		</Box>
	);
};
