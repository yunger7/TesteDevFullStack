import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { App } from "./App";
import { Landing } from "./pages/Landing";
import { Details } from "./pages/Details";
import { Home } from "./pages/Home";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<Home />} />
					<Route path="welcome" element={<Landing />} />
					<Route path="pokemon">
						<Route path=":id" element={<Details />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
