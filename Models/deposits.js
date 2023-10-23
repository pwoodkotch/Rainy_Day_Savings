const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection.js");

class Deposits extends Model {}

Deposits.init(
    {
        deposit_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        deposit_amount: {
            type: DataTypes.NUMBER,
            allowNull: false,
        }, 
        date: {
            type: DataTypes.VIRTUAL,
            get() {
                return dayjs(this.createdAt).format('MM/DD/YYYY hh:mma')
            }
        }
    },
    {
        modelname: "deposit",
        sequelize: db,
        logging: false,
    }
);

module.exports = Deposits