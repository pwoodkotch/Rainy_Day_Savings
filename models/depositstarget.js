const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");


class deposittarget extends Model{}

deposittarget.init({


},{
    sequelize: db,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'deposit_target'
})
 module.exports = deposittarget