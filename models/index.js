const User = require('./User');
const Family = require('./Family'); //really just meant role 

User.hasMany(Family, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Family.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

module.exports = { User, Family}

