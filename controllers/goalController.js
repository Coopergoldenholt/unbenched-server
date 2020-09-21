module.exports = {
	insertGoals: async (req, res) => {
		const db = req.app.get("db");
		const {
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

		const [goals] = await db.goals.insert_goals([
			req.session.user.defaultSeason.id,
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
		res.status(200).send(goals);
	},
	getGoals: async (req, res) => {
		const db = req.app.get("db");
		const { seasonId } = req.params;

		const [goals] = await db.goals.get_season_goals([
			seasonId,
			req.session.user.id,
		]);
		res.status(200).send(goals);
	},
};
