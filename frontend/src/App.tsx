import { Outlet } from "react-router-dom";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { useLocalStorage, useHotkeys } from "@mantine/hooks";

import { Layout } from "./components/Layout";
import { theme } from "./styles/theme";

import type { ColorScheme } from "@mantine/core";

export const App = () => {
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: "mantine-color-scheme",
		defaultValue: "light",
		getInitialValueInEffect: true,
	});

	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

	useHotkeys([["mod+J", () => toggleColorScheme()]]);

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
				<Layout>
					<Outlet />
				</Layout>
			</MantineProvider>
		</ColorSchemeProvider>
	);
};
