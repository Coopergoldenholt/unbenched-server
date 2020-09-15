module.exports = {
	insertGame: async (req, res) => {
		const db = req.app.get("db");
		const {
			opponent,
			fieldGoalsAtt,
			fieldGoalsMade,
			threePointAtt,
			threePointMade,
			freeThrowAtt,
			freeThrowMade,
			offRebound,
			defRebound,
			assists,
			block,
			steal,
			turnover,
			foul,
		} = req.body;

		const date = `${new Date().getFullYear()}-${
			new Date().getMonth() + 1
		}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`;
		const [game] = await db.game.insert_game([
			opponent,
			req.session.user.id,
			date,
			req.session.user.defaultSeason.id,
		]);

		const [fullGame] = await db.game.insert_player_stats([
			game.id,
			req.session.user.id,
			fieldGoalsAtt,
			fieldGoalsMade,
			threePointAtt,
			threePointMade,
			freeThrowAtt,
			freeThrowMade,
			offRebound,
			defRebound,
			steal,
			assists,
			block,
			turnover,
			foul,
		]);

		res.status(200).send("Game Created");
	},
	getGamesBySeason: async (req, res) => {
		const db = req.app.get("db");

		const games = await db.game.get_game_by_season(
			req.session.user.defaultSeason.id
		);
		res.status(200).send(games);
	},
};
