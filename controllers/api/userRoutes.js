const router = require('express').Router();
const passport = require('passport');
const { User, Family } = require('../../models');

router.get('/', async (req, res) => {
	try {
		const userData = await User.findAll({
			attributes: { exclude: ['password'] },
		});
		res.status(200).json(userData);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const userData = await User.findOne({
			attributes: { exclude: ['password'] },
			where: { id: req.params.id },
			include: [
				{
					model: Family,
					attributes: ['id', 'role'],
				},
			],
		});
		//use console.log to help to see the table
		console.log(userData);
		if (!userData) {
			res.status(404).json({ message: `No such user id ${req.params.id}` });
			return;
		}
		res.status(200).json(userData);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.post('/', async (req, res) => {
	try {
		const userData = await User.create(req.body);

		console.log(userData);
		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.name = userData.name;
			req.session.logged_in = true;
			//201 indicates that the request has succeeded and has led to the creation of a resource.
			res
				.status(201)
				.json({ message: `Successfully created ${userData.name}` });
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

// router.post(
// 	'/login',
// 	passport.authenticate('local', { failureRedirect: '/login' }),
// 	function (req, res) {
// 		res.redirect('/');
// 	}
// );

router.post('/login', async (req, res) => {
	try {
		const userData = await User.findOne({
			where: { email: req.body.email },
		});
		if (!userData) {
			res
				.status(400)
				.json({ message: 'Incorrect name or password, please try again' });
			return;
		}

		const validPassword = await userData.checkPassword(req.body.password);

		if (!validPassword) {
			res
				.status(400)
				.json({ message: 'Incorrect name or password, please try again' });
			return;
		}

		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.email = userData.email;
			req.session.name = userData.name;
			req.session.logged_in = true;

			res.json({ user: userData, message: 'You are now logged in!' });
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

router.post('/logout', (req, res) => {
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

module.exports = router;