const router = require('express').Router();
const { Chore } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
	try {
		const newChore = await Chore.create({
			...req.body,
			user_id: req.session.user_id,
		});

		res.status(200).json(newChore);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.delete('/:id', withAuth, async (req, res) => {
	try {
		const choreData = await Chore.destroy({
			where: {
				id: req.params.id,
				user_id: req.session.user_id,
			},
		});

		if (!choreData) {
			res.status(404).json({ message: 'No project found with this id!' });
			return;
		}

		res.status(200).json(choreData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
