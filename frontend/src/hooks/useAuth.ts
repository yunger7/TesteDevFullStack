import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";

export const useAuth = () => {
	const [user, loading, error] = useAuthState(auth);

	async function logout() {
		await signOut(auth);
	}

	return {
		user,
		loading,
		error,
		logout,
	};
};
