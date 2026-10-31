import { Post } from "../models/post.model.js";

//CRUD API's Logic in it so

//1.. (Create) Create a post ->
const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;
    if (!name || !description || !age) {
      return res.status(400).json({ massage: "Full Info not given" });
    }

    const post = await Post.create({ name, description, age });

    res.status(201).json({ message: "Post Creation Success", post });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

//2.. (Read) Get all posts
const getPosts = async (req, res) => {
  try {
    const getPosts = await Post.find();
    res.status(200).json(getPosts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const updatePost = async (req, res) => {
  try {
    //basic validation to check if user is not empty
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "No data provided for Update !!!",
      });
    }

    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) {
      return res.status(404).json({ message: "Post Not Found" });
    }

    res.status(200).json({ message: "Post Updation Success", post });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Post Not Found" });
    }

    res.status(200).json({ message: "Deletion of that post Success" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export { createPost, getPosts, updatePost, deletePost };
