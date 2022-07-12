const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");

class Blog extends Model {}

Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        blog: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW // returns current date/time
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "users",
                key: "id"
            }
        },
        
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: "blog"
    }
);

module.exports = Blog;

