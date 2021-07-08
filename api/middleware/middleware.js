const User = require("../users/users-model");
const Post = require("../posts/posts-model");

function logger(req, res, next) {
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${timestamp}] ${method} to ${url}`);
  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: "no such user",
      });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(404).json({
      message: "no such user",
    });
  }
}

function validateUser(req, res, next) {
  if (!req.body.name) {
    next({
      status: 400,
      message: "missing required name field",
    });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body.text) {
    next({
      status: 400,
      message: "missing required text field",
    });
  } else {
    next();
  }
}

const notFound = (req, res, next) => {
  res.status(404).json({
    message: "not found, sorry!",
  });
};

const errorHandling = (err, req, res, next) => {
  // eslint-disable-line
  const status = err.status || 500;
  res.status(status).json({
    message: err.message,
  });
};

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  notFound,
  errorHandling,
};
