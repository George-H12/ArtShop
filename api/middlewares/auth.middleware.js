// auth.middleware.js
export const authenticateUser = (req, res, next) => {
    if (req.session && req.session.user) {
      req.user = req.session.user;
      next();
    } else {
      // User is not authenticated, handle accordingly
      res.status(401).json({ error: "Unauthorized" });
    }
  };
  