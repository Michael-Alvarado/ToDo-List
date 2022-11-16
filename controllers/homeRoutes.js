const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

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
/* localhost:3001/ -> home page */
router.get('/', async (req, res) => {
    try {
        res.render('homepage');
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


/* localhost:3001/login -> login page */ 
router.get('/login', (req, res) => {
    //app.use(session(sess))
    //question: where to find session.logged_in? 
    if(req.session.logged_in){
        res.redirect('/');
        return;
    }

    //console.log(req.session.logged_in)
    res.render('login')
})


router.get('/signup', (req, res) => {
    res.render('signup');
})


router.get('/post/:id', async (req, res) => {
    try{
        const postData = await Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ['id','content','title','created_at'],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const post = postData.get({ plain: true });

        res.render('single-post', {
            post,
            logged_in: req.session.logged_in,
            username: req.session.username,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});


module.exports = router;