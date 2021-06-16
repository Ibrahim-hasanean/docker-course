const Post = require("../models/Post");

module.exports = {
  addPost: async (req, res) => {
    try {
      let newPost = await Post.create(req.body);
      return res.status(201).json({ status: 201, newPost });
    } catch (error) {
      console.log(error.toString());
      res.status(400).json({ status: 400, error });
    }
  },
  getPosts: async (req, res) => {
    try {
      let posts = await Post.find();
      return res.status(200).json({ status: 200, posts });
    } catch (error) {
      res.status(400).json({ status: 400, error });
    }
  },
  getPost: async (req, res) => {
    try {
      let posts = await Post.findById(req.params.id);
      return res.status(200).json({ status: 200, posts });
    } catch (error) {
      res.status(400).json({ status: 400, error });
    }
  },
  updatePost: async (req, res) => {
    try {
      let posts = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      return res.status(200).json({ status: 200, posts });
    } catch (error) {
      res.status(400).json({ status: 400, error });
    }
  },
  deletePost: async (req, res) => {
    try {
      let posts = await Post.findByIdAndDelete(req.params.id);
      return res.status(200).json({ status: 200, posts });
    } catch (error) {
      res.status(400).json({ status: 400, error });
    }
  },
};
