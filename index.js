const express = require("express");
require("dotenv").config();
const session = require("express-session");
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const massive = require("massive");

const sessionCtrl = require("./controllers/sessionController");
const seasonCtrl = require("./controllers/seasonController");
const gameCtrl = require("./controllers/gameController");
const goalCtrl = require("./controllers/goalController");
const workoutCtrl = require("./controllers/workoutController");
const drillCtrl = require("./controllers/drillsController");
const drillsController = require("./controllers/drillsController");

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
app.post("/api/user/default-season", sessionCtrl.setDefaultGym);
app.post("/api/user/logout", sessionCtrl.destroySession);

//Season Calls
app.post("/api/user/season", seasonCtrl.insertSeason);
app.put("/api/user/seson/:id", seasonCtrl.setDefaultSeason);
app.get("/api/user/season/averages", seasonCtrl.getSeasonAverages);

//Game Calls
app.post("/api/user/game", gameCtrl.insertGame);
app.get("/api/user/season/games", gameCtrl.getGamesBySeason);

//Goal Calls
app.post("/api/user/season/goals", goalCtrl.insertGoals);
app.get("/api/user/season/goals/:seasonId", goalCtrl.getGoals);

//Workout Calls
app.get("/api/workout/stats", workoutCtrl.generateWorkoutWithStats);
app.get("/api/workout/custom", workoutCtrl.generateBasketballWorkout);
app.get("/api/workout/results/:workoutId", workoutCtrl.getWorkoutResults);
app.post("/api/workout/complete", workoutCtrl.insertWorkoutResult);
app.get("/api/workout", workoutCtrl.getPreviousWorkouts);

//Drill Calls
app.get("/api/drills", drillsController.getAllDrill);

massive({
	connectionString: CONNECTION_STRING,
	ssl: { rejectUnauthorized: false },
}).then(async (db) => {
	await app.set("db", db);
	app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} is listening`));
});
