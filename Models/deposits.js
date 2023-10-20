const { Model, DataTypes } = require("sequelize");
const db = require("../config/connetion.js");

class deposits extends Model {}

deposits.init({
    deposit_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    depositer_name: {
        references: {
            model: "user",
            key: "id",
        },
    },
});
