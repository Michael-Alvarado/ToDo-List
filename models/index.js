const User = require('./User');
const Family = require('./Family'); //really just meant role 
const Chore = require('./Chore');

User.hasMany(Family, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

User.hasMany(Chore, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Family.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Family.hasMany(Chore, {
    foreignKey: 'family_id',
    onDelete: 'CASCADE',
});

Chore.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Chore.belongsTo(Family, {
    foreignKey: 'family_id',
    onDelete: 'CASCADE',
});

module.exports = { User, Family, Chore}

