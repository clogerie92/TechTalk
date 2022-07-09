const Users = require("./Users")
const Blog = require("./Blog");
const Comments = require("./Comments");

User.hasMany(Blog, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

Blog.belongsTo(Users, {
    foreignKey: "user_id"
});

Blog.hasMany(Comments, {
    foreignKey: "blog_id"
});

Comments.belongsTo(Blog, {
    foreignKey: "user_id"
});

module.exports = {Users, Blog, Comments};