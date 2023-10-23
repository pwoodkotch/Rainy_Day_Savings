const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection.js");
const Deposits = require("deposits")

class User extends Model {}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
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
            type: DataTypes.NUMBER,
            allowNull: false,
        },
    },
    {
        modelName: 'user',
         // Connection object
        sequelize: db,
        hooks: {
        async beforeCreate(user) {
            user.password = await hash(user.password, 10);

            return user;
            }
        }
    }
);



User.hasMany(Deposits, { as: 'deposits', foreignKey: 'user_id' });
Deposits.belongsTo(User, { as: 'depositer_name', foreignKey: 'user_id' });

module.exports = User;
