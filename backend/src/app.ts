import "dotenv/config";
import express from "express";

const PORT = process.env["PORT"] || 5000;

const app = express();

app.get("/", (req, res) => {
	res.json({
		message: "Hello world!",
	});
});

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}`);
});
