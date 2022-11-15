const sequelize = require('../config/connection');
const { User, Family } = require('../models');

const userData = require('./userData');
const familyData = require('./familyData');

const seedDatabase = async () => {
	await sequelize.sync({ force: true });

	const users = await User.bulkCreate(userData, {
		individualHooks: true,
	
	});

	// console.log(users)
	const family = await Family.bulkCreate(familyData);

	process.exit(0);
};

seedDatabase();
