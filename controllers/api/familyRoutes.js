const router = require('express').Router();
const { User, Family, Chore } = require('../../models');
const withAuth = require('../../utils/auth');

/* localhost:3001/api/family/ -> create a GET route to see the response (use insomnia) */
router.get('/', async (req, res) => {
	try{
		const familyData = await Family.findAll({
			attributes: ['id', 'role', 'family_name'],
			order: [['id']],
			// TODO: Placeholder, not sure if we want to include other models
			include: [
				{
					model: User, attributes: ['name']
				}
			]
		});
		res.status(200).json(familyData)
	} catch (err){
		res.status(400).json(err)
	}
})

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

router.put('/:id', withAuth, async (req, res) => {
	try{
		const updatedFamily = await Family.update(
			{
				role: req.body.role,
				family_name: req.body.family_name,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		);
		if(!updatedFamily){
			res.status(404).json({ message: 'No family role found with this id!'});
			return;
		}

		res.json(updatedFamily);
	} catch (err){
		res.status(500).json(err)
	}
})

router.delete('/:id', withAuth, async (req, res) => {
	try{
		const familyData = await Family.destroy({
			where: {
				id: req.params.id,
			},
		});

		if(!familyData){
			res.status(404).json({ message: `No family role found with this id!`})
			return;
		}
		
		res.status(200).json(familyData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
