const User = require('./user.js');
const Deposits = require('./deposits.js');
const Target = require('./target.js');
const db = require("../config/connection");
// const sequelize = require('../config/connection');




User.hasMany(Deposits,{
    foreignKey:'id'
})
Deposits.belongsTo(User,{
    foreignKey:'id'
})
User.hasMany(Target,{
    foreignKey:'id'
})
Target.belongsTo(User,{
    foreignKey:'id'
})

Target.hasMany(Deposits,{
    foreignKey:'id'
})
Deposits.belongsTo(Target,{
    foreignKey:'id'
})
//user has many targets
// target has many deposits
//target belongs to user
//deposits belong to user

module.exports = {User,Deposits,Target}