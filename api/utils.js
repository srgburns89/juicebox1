
function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action",
    });
  }

  next();
}

// utilsRouter.post('/login', requireUser, async (req, res, next) => {
//   const utils = await
// });
module.exports = {
  requireUser,
};