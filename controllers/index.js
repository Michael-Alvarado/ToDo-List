const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

router.get('/login', function (req, res, next) {
	res.render('login');
});

module.exports = router;
