const router = require('express').Router();
const { Blog, Comments, Users } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  console.log('GET /api/blogs')
  try {
      const blogData = await Blog.findAll({
          attributes: [
              'id',
              'blog',
          ],
          include: [
              {
                  model: Comments,
                  attributes: ['id', 'comment', 'blog_id', 'user_id', 'date_created'],
                  include: {
                      model: Users,
                      attributes: ['username']
                  }
              },
              {
                  model: Users,
                  attributes: ['username'],
              },
          ]
      })
      res.json(blogData);

  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

// create a blog
router.post('/', withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a blog with matching id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'Error 404: No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;