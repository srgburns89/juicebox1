const express = require("express");
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require("../db");
// const postsRouter = require('./posts');
tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");
  next();
});
tagsRouter.get("/", async (req, res) => {
  const tags = await getAllTags();
  res.send({
    tags,
  });
});
tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  // read the tagname from the params
  const user = req.user;
  try {
    // use our method to get posts by tag name from the db
    const allPosts = await getPostsByTagName(req.params.tagName);
    console.log(allPosts);
    const posts = allPosts.filter((post) => {
      if (post.active) {
        return true;
      }
      if (user && post.author.id === user.id) {
        return true;
      }
      return false;
    });
    // send out an object to the client { posts: // the posts }
    res.send({ posts });
  } catch ({ name, message }) {
    // forward the name and message to the error handler
    next({ name, message });
  }
});
module.exports = tagsRouter;