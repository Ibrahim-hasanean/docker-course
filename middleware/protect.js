module.exports = (req, res, next) => {
  let { user } = req.session;
  console.log("user", user);
  if (!user) return res.status(401).json({ message: "unauthorize" });
  req.user = user;
  next();
};
