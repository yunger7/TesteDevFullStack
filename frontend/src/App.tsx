import { Outlet } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

export const App = () => {
	return (
		<MantineProvider withGlobalStyles withNormalizeCSS>
			<Outlet />
		</MantineProvider>
	);
};
