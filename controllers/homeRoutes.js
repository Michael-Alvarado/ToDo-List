const router = require('express').Router();
const { Family, User } = require('../models');
const withAuth = require('../utils/auth');
const passport = require('passport');

/**
 * ! STEP TO RUN THE APP
 * ! mysql -u root -p; SOURCE db/schema.sql;
 * ! npm run seed
 * ! npm run nodemon
 * ! during testing, if you get stuck in the session, you need to clear it -> right click 'inspect' on google chrome -> Application -> Cookies -> clear
 * ! HomeRoute should be GET request only because POST, PUT, and DELETE should be handled by respective api route
 */

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
router.get('/login', (req, res) => {
	if (req.session.logged_in) {
		//if logged in, redirect to the user.handlebars
		res.redirect('/user');
		return;
	}

	res.render('login');
});

router.get('/signup', function (req, res, next) {
	res.render('signup');
});

/* localhost:3001/user -> user page */
router.get('/user', withAuth, async (req, res) => {

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

/* localhost: 3001 -> add new role */
router.get('/user/new', (req, res) => {
	res.render('new-role', { name:req.session.name })
})

router.get('/user/edit/:id', async (req, res) => {
	try{
		const familyData = await Family.findOne({
			where: {
				id: req.params.id,
			},
			attributes: ['id', 'role', 'family_name']
		});
		
		//not using map because map will return array, since findOne will only return one result, therefore we will not use map here.
		const family = familyData.get({plain: true})

		res.render('edit-user', {
			family,
			logged_in: true,
			name: req.session.name,
		});
	} catch (err){
		console.log(err);
		res.status(500).json(err);
	}
})


module.exports = router;
