import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { useLocalStorage, useHotkeys } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";

import { Layout } from "./components/Layout";
import { useAuth } from "./hooks/useAuth";
import { theme } from "./styles/theme";

import type { ColorScheme } from "@mantine/core";

export const App = () => {
	const navigate = useNavigate();
	const { user, loading, error } = useAuth();

	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: "color-scheme",
		defaultValue: "light",
		getInitialValueInEffect: true,
	});

	const [authCheckComplete, setAuthCheckComplete] = useState(false);

	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

	useHotkeys([["mod+J", () => toggleColorScheme()]]);

	useEffect(() => {
		if (!loading && !error) {
			setAuthCheckComplete(true);

			if (!user) {
				navigate("/welcome");
			}
		}
	}, [user, loading, error, navigate]);

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider
				theme={{ ...theme, colorScheme }}
				withGlobalStyles
				withNormalizeCSS
			>
				<NotificationsProvider>
					<Layout>{authCheckComplete ? <Outlet /> : null}</Layout>
				</NotificationsProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	);
};
