const bcrypt = require("bcryptjs");
const { STRIPE_SECRET_KEY } = process.env;
const stripe = require("stripe")(STRIPE_SECRET_KEY);
const saltRounds = 12;

module.exports = {
	loginUser: async (req, res) => {
		const db = req.app.get("db");
		let { email, password } = req.body;
		email = email.toLowerCase();
		const [user] = await db.session.get_user_by_email(email);

		if (!user) {
			return res.status(401).send("Username or password incorrect");
		}
		const result = await bcrypt.compare(password, user.password);

		if (result) {
			let [season] = await db.season.get_default_season([user.id]);
			req.session.user = {
				email: user.email,
				name: user.name,
				loggedIn: true,
				defaultSeason: season,
				user: user.type_of_user,
				id: user.id,
			};
			res.status(200).send(req.session.user);
		} else res.status(401).send("Username or password incorrect");
	},
	registerUser: async (req, res) => {
		const db = req.app.get("db");
		const { email, password, firstName, lastName } = req.body;
		const [existingUser] = await db.session.get_user_by_email(email);
		if (existingUser) {
			return res.status(400).send("Email is already in use");
		}
		const salt = await bcrypt.genSalt(saltRounds);
		const hash = await bcrypt.hash(password, salt);

		const [user] = await db.session.create_user_local([
			firstName,
			lastName,
			email,
			hash,
		]);

		req.session.user = {
			name: user.full_name,
			email: user.email,
			loggedIn: true,
			id: user.id,
		};
		res.status(200).send(req.session.user);
	},
};
