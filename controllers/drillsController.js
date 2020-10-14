module.exports = {
	getAllDrill: async (req, res) => {
		const db = req.app.get("db");
		let drills = await db.videos.get_all_videos();
		console.log(drills);
		res.status(200).send(drills);
	},
};
