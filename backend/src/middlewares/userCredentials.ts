import { auth } from "../services/firebase";
import type { Request, Response, NextFunction } from "express";

export async function userCredentials(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		if (
			!req.headers.authorization ||
			!req.headers.authorization?.match(/^bearer .*$/i)
		) {
			return res.status(401).json({ message: "Missing authorization header" });
		}

		const idToken = req.headers.authorization?.split(" ")[1];
		const credentials = await auth.verifyIdToken(idToken);

		req.credentials = credentials;

		next();
	} catch (error) {
		return res.status(500).json({ message: "Failed to identify user" });
	}
}
