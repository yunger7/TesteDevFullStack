import { AppShell } from "@mantine/core";
import { Header } from "../components/Header";

import type { ReactNode } from "react";

type LayoutProps = {
	children?: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
	return (
		<AppShell
			padding="md"
			header={<Header />}
			styles={theme => ({
				main: {
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			})}
		>
			{children}
		</AppShell>
	);
};
