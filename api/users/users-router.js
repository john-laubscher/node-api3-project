const express = require("express");
const { validateUser, validateUserId, validatePost } = require("../middleware/middleware");
const { getUserPosts } = require("./users-model");
const User = require("../users/users-model");
const Post = require("../posts/posts-model");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get("/", (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
});

router.get("/:id", (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post("/", validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert(req.body)
    .then((createdPost) => {
      res.status(201).json(createdPost);
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/:id", validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete("/:id", (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get("/:id/posts", validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  User.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(next);
});

router.post("/:id/posts", validateUser, validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Post.insert({
    user_id: req.params.id,
    text: req.body.text,
  })
    .then((post) => {
      res.status(201).json(post);
    })
    .catch(next);
});

// do not forget to export the router
module.exports = router;
