module.exports = {
	generateWorkoutWithStats: async (req, res) => {
		const db = req.app.get("db");
		const { time } = req.query;

		// const { seasonId } = req.params;

		const [goalsUnset] = await db.goals.get_season_goals([
			req.session.user.defaultSeason.id,
			req.session.user.id,
		]);
		// console.log(goalsUnset);

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

		const [games] = await db.season.get_average_stats(
			req.session.user.defaultSeason.id
		);

		let ptsAvg = Math.round(games.points * 100) / 100;

		let fgAvg =
			Math.round((games.field_goals_made / games.number_of_games) * 100) / 100;
		let fgaAvg =
			Math.round((games.field_goals_attempted / games.number_of_games) * 100) /
			100;
		let threeAAvg =
			Math.round((games.three_shot / games.number_of_games) * 100) / 100;
		let threeMAvg =
			Math.round((games.three_made / games.number_of_games) * 100) / 100;
		let ftmAvg =
			Math.round((games.free_throw_made / games.number_of_games) * 100) / 100;
		let ftaAvg =
			Math.round((games.free_throw_shot / games.number_of_games) * 100) / 100;
		let orbAvg =
			Math.round((games.offensive_rebound / games.number_of_games) * 100) / 100;
		let drbAvg =
			Math.round((games.defensive_rebound / games.number_of_games) * 100) / 100;
		let astAvg = Math.round((games.assist / games.number_of_games) * 100) / 100;
		let stlAvg = Math.round((games.steal / games.number_of_games) * 100) / 100;
		let blockAvg =
			Math.round((games.block / games.number_of_games) * 100) / 100;
		let tovAvg =
			Math.round((games.turnover / games.number_of_games) * 100) / 100;
		let pfAvg = Math.round((games.foul / games.number_of_games) * 100) / 100;

		let averages = {
			ptsAvg,
			fgAvg,
			fgaAvg,
			ftmAvg,
			ftaAvg,
			orbAvg,
			drbAvg,
			astAvg,
			stlAvg,
			blockAvg,
			tovAvg,
			pfAvg,
			threeAAvg,
			threeMAvg,
		};

		let averagesFGPerc = averages.fgAvg / averages.fgaAvg;
		let goalFGPerc = goals.fgAvg / goals.fgaAvg;

		let averagesFTPerc = averages.ftmAvg / averages.ftaAvg;
		let goalsFTPerc = goals.ftmAvg / goals.ftaAvg;

		let averagesTRB = averages.orbAvg + averages.drbAvg;
		let goalTRB = goals.orbAvg + goals.drbAvg;

		let averageThreePerc = averages.threeMAvg / averages.threeAAvg;
		let goalsThreePerc = goals.threeMAvg / goals.threeAAvg;

		let pts = averages.pts > goals.pts;
		let fgPer = averagesFGPerc > goalFGPerc;
		let ftPer = averagesFTPerc > goalsFTPerc;
		let trb = averagesTRB > goalTRB;
		let ast = averages.astAvg > goals.astAvg;
		let stl = averages.stlAvg > goals.stlAvg;
		let blk = averages.blockAvg > goals.blockAvg;
		let tov = averages.tovAvg > goals.tovAvg;
		let threePerc = averageThreePerc > goalsThreePerc;

		let videos = await db.videos.get_all_videos();

		let warmUpVideos = await videos.filter((ele) => {
			return ele.type === "warmup";
		});

		let shootingVideos = await videos.filter((ele) => {
			return ele.type === "shooting";
		});
		let dribblingVideos = await videos.filter((ele) => {
			return ele.type === "dribbling";
		});
		let defenseVideos = await videos.filter((ele) => {
			return ele.type === "defense";
		});
		let reboundVideos = await videos.filter((ele) => {
			return ele.type === "rebound";
		});

		let warmUpIndex = await Math.floor(
			Math.random() * (warmUpVideos.length - 0)
		);
		let shootingIndex = await Math.floor(
			Math.random() * (shootingVideos.length - 0)
		);
	},
};
