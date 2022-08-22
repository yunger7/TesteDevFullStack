import "dotenv/config";
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const app = initializeApp({
	credential: cert({
		projectId: process.env["FIREBASE_PROJECT_ID"],
		clientEmail: process.env["FIREBASE_CLIENT_EMAIL"],
		privateKey: process.env["FIREBASE_PRIVATE_KEY"]
			? process.env["FIREBASE_PRIVATE_KEY"].replace(/\\n/gm, "\n")
			: undefined,
	}),
	databaseURL: process.env["FIREBASE_DATABASE_URL"],
});

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
