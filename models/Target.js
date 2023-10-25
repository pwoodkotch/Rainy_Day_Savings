const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");

class Target extends Model {}
Target.init({

    target_amount:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    started:{
        type:DataTypes.STRING,
        allowNull:false
    },
    saved:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    completion:{
        type: DataTypes.INTEGER,
        allowNull:false

    }

},{
    modelName:'target',
    sequelize: db,
    logging: false
})

module.exports = Target