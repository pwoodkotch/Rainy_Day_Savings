const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");

class Target extends Model {}
Target.init({

    target_amount:{
        type:DataTypes.INTEGER,
        allowNull: false
    }
},{
    modelName:'target',
    sequelize: db,
    logging: false
})

module.exports = Target