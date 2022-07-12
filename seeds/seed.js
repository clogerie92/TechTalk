const sequelize = require('../config/connection');
const { Blog, Comments, Users } = require('../models');
const blogData = require('./blogData.json');
const commentData = require('./commentsData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const blogUsers = await Users.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await Blog.create({
      ...blog,
      user_id: blogUsers[Math.floor(Math.random() * blogUsers.length)].id,
    });
  }

  const comments = await Comments.bulkCreate(commentData, {
    returning: true
  });

  process.exit(0);
};

seedDatabase();