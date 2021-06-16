const User = require("../models/User");
const bcrypt = require("bcrypt");
module.exports = {
  signUp: async (req, res) => {
    let { email, password } = req.body;
    try {
      let hashPassword;
      if (password) hashPassword = await bcrypt.hash(password, 12);
      let newUser = await User.create({ email: email, password: hashPassword });
      req.session.user = newUser;
      return res.status(201).json({ status: 200, user: newUser });
    } catch (e) {
      return res.status(400).json({ status: 400, error: e.toString() });
    }
  },
  login: async (req, res) => {
    let { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user)
        return res.status(404).json({ status: 404, error: "user not found" });
      let comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword)
        return res.status(400).json({ status: 400, error: "wrong password" });
      req.session.user = user;
      return res.status(201).json({ status: 200, user });
    } catch (e) {
      return res.status(400).json({ status: 400, error: e.toString() });
    }
  },
};
