exports.restrict = (role) => {
  return (req, res, next) => {
    console.log("from restrict :", req.user.role);
    if (role.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({
        message: req.user.role + " is not permitted for this action",
      });
    }
  };
};
