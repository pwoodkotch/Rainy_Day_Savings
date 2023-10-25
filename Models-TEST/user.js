const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");
const{ hash,compare} = require('bcrypt')

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
        hooks:{
            async beforeCreate(user){
                user.password= await hash(user.password,10)
                return user
            }
        }
    }
);
User.prototype.validatePass = async function(form_password){
    
    const is_valid = await compare(form_password.trim(), this.password.trim())
    return is_valid
} 

module.exports = User;
