import {
	Header as MantineHeader,
	Container,
	Skeleton,
	Group,
	ActionIcon,
	useMantineColorScheme,
	createStyles,
} from "@mantine/core";
import {
	TbSun as IconSun,
	TbMoon as IconMoon,
	TbBrandGithub as IconGithub,
	TbLogout as IconLogout,
} from "react-icons/tb";

import { Logo } from "./Logo";

import { useAuth } from "../hooks/useAuth";

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
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const { user, loading, logout } = useAuth();

	return (
		<MantineHeader className={classes.header} height={60} p="xs">
			<Container className={classes.container} size="xl">
				<Logo />
				{loading ? (
					<Skeleton animate height={24} width={96} />
				) : (
					<Group spacing="sm">
						<ActionIcon
							variant="default"
							component="a"
							href="https://github.com/yunger7/TesteDevFullStack"
							target="_blank"
						>
							<IconGithub size={18} />
						</ActionIcon>
						<ActionIcon variant="default" onClick={() => toggleColorScheme()}>
							{colorScheme === "dark" ? (
								<IconSun size={18} />
							) : (
								<IconMoon size={18} />
							)}
						</ActionIcon>
						{user && (
							<ActionIcon variant="default" onClick={logout}>
								<IconLogout size={18} />
							</ActionIcon>
						)}
					</Group>
				)}
			</Container>
		</MantineHeader>
	);
};
