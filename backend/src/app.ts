import "dotenv/config";
import express from "express";
import cors from "cors";

import pokemonRouter from "./routes/pokemons";
import userRouter from "./routes/users";

const PORT = process.env["PORT"] || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/pokemons", pokemonRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}`);
});
