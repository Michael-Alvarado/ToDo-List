const User = require('./User');
const Family = require('./Family');
const Chore = require('./Family');

Family.hasMany(User, {
    foreignKey: 'role_id',
    onDelete: 'CASCADE',
});

Family.hasMany(Chore, {
    foreignKey: 'role_id',
    onDelete: 'CASCADE',
});

User.belongsTo(Family, {
    foreignKey: 'role_id',
    onDelete: 'CASCADE',
});

User.hasMany(Chore, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Chore.belongsTo(Family, {
    foreignKey: 'role_id',
    onDelete: 'CASCADE',
});

Chore.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

module.exports = { User, Family, Chore}

