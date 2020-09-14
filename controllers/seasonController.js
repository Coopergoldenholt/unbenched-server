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
};
