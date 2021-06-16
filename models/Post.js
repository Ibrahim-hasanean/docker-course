const mongooose = require("mongoose");
const Schema = mongooose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "post must have a title"],
  },
  body: {
    type: String,
    required: [true, "post must have a body"],
  },
});

module.exports = mongooose.model("posts", postSchema);
