const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
	try {
		const newFamily = await Family.create({
			...req.body,
			user_id: req.session.user_id,
		});

		res.status(200).json(newFamily);
	} catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;
