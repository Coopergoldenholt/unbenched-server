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

		const [goalsUnset] = await db.goals.get_season_goals([
			seasonId,
			req.session.user.id,
		]);

		const twoPointsMade = goalsUnset.field_goals_made - goalsUnset.three_made;

		const points =
			goalsUnset.three_made * 3 +
			twoPointsMade * 2 +
			goalsUnset.free_throw_made;

		const goals = {
			ptsAvg: points,
			fgAvg: goalsUnset.field_goals_made,
			fgaAvg: goalsUnset.field_goals_attempted,
			ftmAvg: goalsUnset.free_throw_made,
			ftaAvg: goalsUnset.free_throw_shot,
			orbAvg: goalsUnset.offensive_rebound,
			drbAvg: goalsUnset.defensive_rebound,
			astAvg: goalsUnset.assist,
			stlAvg: goalsUnset.steal,
			blockAvg: goalsUnset.block,
			tovAvg: goalsUnset.turnover,
			pfAvg: goalsUnset.foul,
			threeAAvg: goalsUnset.three_shot,
			threeMAvg: goalsUnset.three_made,
		};
		res.status(200).send(goals);
	},
};
