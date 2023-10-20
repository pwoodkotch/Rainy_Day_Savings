const { Model, DataTypes } = require("sequelize");
const db = require("../config/connetion.js");

class User extends Model {}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: 7,
                    msg: "password must be more than 7 characters",
                },
            },
        },
        income: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        modelname: "user",
        sequelize: db,
        logging: false,
    }
);

module.exports = User;
