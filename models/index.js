const Users = require("./Users")
const Blog = require("./Blog");
const Comments = require("./Comments");

Users.hasMany(Blog, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

Blog.belongsTo(Users);

Blog.hasMany(Comments, {
    foreignKey: "blog_id"
});

Comments.belongsTo(Blog);

Users.hasMany(Comments, {
    foreignKey: "user_id"
});

Comments.belongsTo(Users);

module.exports = {Users, Blog, Comments};