import { AppShell } from "@mantine/core";
import { Header } from "../components/Header";

import type { ReactNode } from "react";

type LayoutProps = {
	children?: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
	return (
		<AppShell padding="md" header={<Header />}>
			{children}
		</AppShell>
	);
};
