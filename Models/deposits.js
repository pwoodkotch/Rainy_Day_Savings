const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");

class Deposits extends Model {}

Deposits.init({
    deposit_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    username: {
        type:DataTypes.STRING,
        references: {
            model: "users",
            key: "username",
        },
    },
},{
    modelName:'deposits',
    sequelize: db,
    logging: false
})


module.exports = Deposits