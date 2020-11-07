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
			req.session.user = {
				email: user.email,
				firstName: user.first_name,
				lastName: user.last_name,
				name: `${user.first_name} ${user.last_name}`,
				loggedIn: true,
				id: user.id,
				athleteGymDefault: user.athlete_gym_default,
				profilePic: user.profile_pic,
				birthDay: user.birth_day,
			};
			res.status(200).send(req.session.user);
		} else res.status(401).send("Username or password incorrect");
	},
	registerUser: async (req, res) => {
		const db = req.app.get("db");
		let { email, password, firstName, lastName } = req.body;
		email = email.toLowerCase();
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
			email: user.email,
			firstName: user.first_name,
			lastName: user.last_name,
			name: `${user.first_name} ${user.last_name}`,
			loggedIn: true,
			id: user.id,
			athleteGymDefault: user.athlete_gym_default,
			profilePic: user.profile_pic,
			birthDay: user.birth_day,
		};
		res.status(200).send(req.session.user);
	},
	setDefaultGym: async (req, res) => {
		const db = req.app.get("db");
		const { id } = req.body;

		const [user] = await db.session.set_user_gym_default([
			req.session.user.id,
			id,
		]);

		req.session.user = {
			email: user.email,
			firstName: user.first_name,
			lastName: user.last_name,
			name: `${user.first_name} ${user.last_name}`,
			loggedIn: true,
			id: user.id,
			athleteGymDefault: user.athlete_gym_default,
			profilePic: user.profile_pic,
			birthDay: user.birth_day,
		};
		res.status(200).send(req.session.user);
	},
	destroySession: async (req, res) => {
		req.session.destroy();
		res.status(200).send("logged out");
	},
};
