const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");

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
        }
    },
    {
        indexes:[{fields:['username']}],
        modelname: "user",
        sequelize: db,
        logging: false,
    }
);

module.exports = User;
