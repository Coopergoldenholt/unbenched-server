module.exports = {
	insertSeason: async (req, res) => {
		const db = req.app.get("db");
		let { seasonName, setDefault } = req.body;
		let season = null;

		if (setDefault) {
			[season] = await db.season.insert_season_default([
				seasonName,
				req.session.user.id,
				setDefault,
			]);
			req.session.user.defaultSeason = season;
		} else {
			[season] = await db.season.insert_season_nondefault([
				seasonName,
				req.session.user.id,
				setDefault,
			]);
		}

		if (season) {
			res.status(200).send(req.session.user);
		} else {
			res.status(401).send("Season Not Created, Try Again Later");
		}
	},
	setDefaultSeason: async (req, res) => {
		const db = req.app.get("db");
		let { seasonId } = req.params;
		let [season] = await db.seson.change_default_season([
			seasonId,
			req.session.user.id,
		]);
		req.session.user.defaultSeason = season;
		res.status(200).send(req.session.user);
	},
	getSeasonAverages: async (req, res) => {
		const db = req.app.get("db");

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

		res.status(200).send(averages);
	},
};
