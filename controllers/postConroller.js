const Post = require("../models/Post");
const slugify = require("slugify");

exports.create = (req, res) => {
  const { title, content, user } = req.body;
  const slug = slugify(title);

  // check validation
  if (!title || !content) {
    return res.status(400).json({
      error: "Title and content is required",
    });
  }
  // save data inside database
  Post.create({ title, content, user, slug }, (err, post) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        error: "Duplicate post, try another title",
      });
    }
    res.json(post);
  });
};

// render all posts
exports.list = (req, res) => {
  Post.find({})
    .limit(10)
    .sort({ createdAt: -1 })
    .exec((err, posts) => {
      if (err) {
        console.log(err);
      }
      res.json(posts);
    });
};

// render single post depend on slug (title)
exports.read = (req, res) => {
  const slug = req.params.slug;
  Post.findOne({ slug }).exec((err, post) => {
    if (err) {
      console.log(err);
    }
    res.json(post);
  });
};

// update method

exports.update = (req, res) => {
  const { slug } = req.params;

  const { title, content, user } = req.body;
  Post.findOneAndUpdate({ slug }, { title, content, user }, { new: true }).exec(
    (err, post) => {
      if (err) {
        console.log(err);
      }
      res.json(post);
    }
  );
};

// delete method

exports.remove = (req, res) => {
  const { slug } = req.params;
  Post.findOneAndDelete({ slug }).exec((err, post) => {
    if (err) {
      return console.log(err);
    }
    res.json({
      message: "Post deleted",
    });
  });
};
