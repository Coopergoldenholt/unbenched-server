const express = require("express");
require("dotenv").config();
const session = require("express-session");
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const massive = require("massive");

const sessionCtrl = require("./controllers/sessionController");
const seasonCtrl = require("./controllers/seasonController");
const gameCtrl = require("./controllers/gameController");
const goalCtrl = require("./controllers/goalController");

const app = express();

app.use(express.json());

app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);

//Authorization Calls
app.post("/api/user/login", sessionCtrl.loginUser);
app.post("/api/user/register", sessionCtrl.registerUser);

//Season Calls
app.post("/api/user/season", seasonCtrl.insertSeason);
app.put("/api/user/seson/:id", seasonCtrl.setDefaultSeason);

//Game Calls
app.post("/api/user/game", gameCtrl.insertGame);
app.get("/api/user/season/games", gameCtrl.getGamesBySeason);

//Goal Calls
app.post("/api/user/season/goals", goalCtrl.insertGoals);

massive({
	connectionString: CONNECTION_STRING,
	ssl: { rejectUnauthorized: false },
}).then(async (db) => {
	await app.set("db", db);
	app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} is listening`));
});
