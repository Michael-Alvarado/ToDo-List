const router = require('express').Router();
const passport = require('passport');

const { Chore, Family, User } = require('../models');
const withAuth = require('../utils/auth');
const { route } = require('./api');

router.post(
	'/login',
	passport.authenticate('local', { failureRedirect: '/login' }),
	function (req, res) {
		res.redirect('/');
	}
);

router.post(
	'/login/password',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
	})
);

router.post('/logout', function (req, res, next) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
});

router.get('/signup', function (req, res, next) {
	res.render('signup');
});

router.post('/signup', function (req, res, next) {
	const userData = User.create(req.body);
	req.session.save(() => {
		req.session.user_id = userData.id;
		req.session.name = userData.name;
		req.session.logged_in = true;

		res.status(201).json({ message: `Successfully created ${userData.name}` });
		res.redirect('/');
	});
});

router.get('/', async (req, res) => {
	try {
		// Get all chores and JOIN with user data
		const choreData = await Chore.findAll({
			include: [
				{
					model: User,
					attributes: ['name'],
				},
			],
		});

		// Serialize data so the template can read it
		const chores = choreData.map((chore) => chore.get({ plain: true }));

		// Pass serialized data and session flag into template
		res.render('homepage', {
			chores,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/chore/:id', async (req, res) => {
	try {
		const choreData = await Chore.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attributes: ['name'],
				},
			],
		});

		const project = projectData.get({ plain: true });

		res.render('chore', {
			...chore,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
