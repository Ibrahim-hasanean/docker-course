const mongooose = require("mongoose");
const Schema = mongooose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "user must have email"],
  },
  password: {
    type: String,
    required: [true, "user must have a password"],
  },
});

module.exports = mongooose.model("user", userSchema);
