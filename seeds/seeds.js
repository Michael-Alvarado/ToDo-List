const sequelize = require('../config/connection');
const { User, Family, Chore } = require('../models');

const userData = require('./userData.json');
const familyData = require('./familyData.json');
const choreData = require('./choreData.json')

const seedDatabase = async () => {
    await sequelize.sync ({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const posts = await Family.bulkCreate(familyData, {
        individualHooks: true,
        returning: true,
    });

    const comments = await Chore.bulkCreate(choreData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();