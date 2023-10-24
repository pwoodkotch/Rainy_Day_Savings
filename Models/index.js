const User = require('./User.js');
const Deposits = require('./Deposits.js');
const Target = require('./Target.js');
const db = require("../config/connection.js");

// const sequelize = require('../config/connection');




User.hasMany(Deposits,{
    foreignKey:'user_id'
})
Deposits.belongsTo(User,{
    foreignKey:'user_id'
})
User.hasMany(Target,{
    foreignKey:'user_id'
})
Target.belongsTo(User,{
    foreignKey:'user_id'
})

Target.hasMany(Deposits,{
    foreignKey:'target_id'
})
Deposits.belongsTo(Target,{
    foreignKey:'target_id'
})
//user has many targets
// target has many deposits
//target belongs to user
//deposits belong to user

module.exports = {User,Deposits,Target};