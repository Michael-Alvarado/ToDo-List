const router = require('express').Router();
const { Chore, Family, User } = require('../models');
const withAuth = require('../utils/auth');
const passport = require('passport');

/* localhost:3001/ -> home page */
/* I believe we only want a landing page here, therefore no need to pass anything {object} */
router.get('/', async (req, res) => {
	try{
		res.render('homepage');
	} catch (err) {
		res.status(500).json(err)
	}
});

/* localhost:3001/login -> login page */
/* during testing, if you get stuck in the session, you need to clear it -> right click 'inspect' on google chrome -> Application -> Cookies -> clear */
router.get('/login', (req, res) => {
	if (req.session.logged_in) {
		//if logged in, redirect to the user.handlebars
		res.redirect('/user');
		return;
	}

	res.render('login');
});

/* localhost:3001/user -> user page */
router.get('/user', async (req, res) => {

	//when the user logged in or sign up, we want to pass 'welcome, {{user}}' so we need to pass user model
	//also, we want to pass the logged in with {{#if}} {{else}} {{/if}} to manage the logout, otherwise it will stay logged in
	//this page will be adding the family role, so we will pass the family model 
	try {
		const familyData = await Family.findAll({
			attributes: ['id','role'],
			include: [
				{
					model: User,
					attributes: ['name'],
				}
			],
		});

		const families = familyData.map((family) => family.get({plain: true}))
		
		res.render('user',{
			families,
			logged_in: req.session.logged_in,
			name: req.session.name,
		})
	} catch (err){
		console.log(err)
		res.status(500).json(err)
	}
})


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

		const chore = choreData.get({ plain: true });

		res.render('chore', {
			...chore,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
