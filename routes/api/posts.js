const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

//@route   POST api/post
//@desc    Create a post
//@access  Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = {
        text: req.body.text,
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
      };
      const post = new Post(newPost);
      await post.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error : Post Post");
    }
  }
);

//@route   GET api/post
//@desc    Get all posts
//@access  Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }); //ascending
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error : Get all Posts");
  }
});

//@route   GET api/post/:post_id
//@desc    Get a post
//@access  Private
router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    if (error.kind === "ObjectId") {
      //incase Object ID is not of the proper format
      return res.status(404).json({ msg: "Post not found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error : Get a Post");
  }
});

//@route   DELETE api/post/:post_id
//@desc    Delete a post
//@access  Private
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    //Checking whether the user is the owner of the Post
    if (post.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "You're not authorized to delete this post" });
    }
    await post.remove();
    res.json({ msg: "Post Removed" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      //incase Object ID is not of the proper format
      return res.status(404).json({ msg: "Post not found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error : Delete a Post");
  }
});

//@route   PUT api/post/like/:post_id
//@desc    Like a post
//@access  Private
router.put("/like/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    //check whether the post has already been liked by this user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "You've already liked this post" });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error : Post Like");
  }
});

//@route   PUT api/post/unlike/:post_id
//@desc    unlike a post
//@access  Private
router.put("/unlike/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    //check whether the post has already been liked by this user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ msg: "You can't unlike a post that you haven't liked" });
    }
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.params.post_id);
    post.likes.splice(removeIndex, 1);
    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error : Post Unlike");
  }
});

//@route   POST api/post/comment/:post_id
//@desc    Comment on a post
//@access  Private
router.post(
  "/comment/:post_id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.post_id);
      const newComment = {
        text: req.body.text,
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error : Post Comment");
    }
  }
);

//@route   DELETE api/post/comment/:post_id/:comment_id
//@desc    Delete a comment
//@access  Private
router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    //get the comment from the post
    const comment = post.comments.find(
      (comment) => comment.id.toString() === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }
    //check if the user deleting the comment is the owner of the comment
    if (comment.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "You aren't authorized to delete this comment" });
    }
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.params.comment_id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error : Delete Comment");
  }
});

router.post("/image", async (req, res) => {
  try {
    console.log(req.body.result);
    res.send("Fok");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error : IDK");
  }
});

module.exports = router;
