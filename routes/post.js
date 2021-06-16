const router = require("express").Router();
const {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} = require("../controller/post");

router.route("/").get(getPosts).post(addPost);
router.route("/:id").get(getPost).delete(deletePost).put(updatePost);

module.exports = router;
