import { Outlet } from "react-router-dom";

export const App = () => {
	return (
		<>
			<h1>Hello world!</h1>
			<Outlet />
		</>
	);
};
