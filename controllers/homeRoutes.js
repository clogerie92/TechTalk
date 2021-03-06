const router = require('express').Router();
const { Users, Blog, Comments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const blogData = await Blog.findAll({
        include: [
          {
            model: Users,
            attributes: ["username"],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const blogs = blogData.map((blog) => blog.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('home', { 
        blogs, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/blog/:id', async (req, res) => {
    try {
      const blogData = await Blog.findByPk(req.params.id, {
        include: [
          {
            model: Users,
            attributes: ["username"],
          },
          {
            model: Comments,
            include: [
              {
                model: Users,
                attributes: ["username"]
              }
            ]
          },
        ],
      });
  
      const blog = blogData.get({ plain: true });
  
      res.render("blog", {
        ...blog,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/dashboard", withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await Users.findByPk(req.session.user_id, {
        attributes: { exclude: ["password"] },
        include: [{ model: Blog }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render("dashboard", {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/signin', (req, res) => {
    if (req.session.logged_in) {
      res.redirect("/dashboard");
      return;
    }
  
    res.render("signin");
  });

  router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
      res.redirect("/dashboard");
      return;
    }
  
    res.render("signup");
  });
  
  module.exports = router;