const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const fs = require("fs");

const dotenv = require("dotenv");
dotenv.config();
const USER_TOKEN = process.env.USER_TOKEN;
const jwt = require("jsonwebtoken");

const Posts = require("../models/Posts");

const getPostsAndShared = async (req, res) => {
  const id = req.params.id;
  try {
    const activty = await prisma.activity.findMany({
      select: {
        post: true, // Returns all fields for all posts
        sharedPost: true, // Returns all Profile fields
      },
    });
    res.status(200).json(activty);
  } catch (error) {
    if (error.name)
      return res.status(401).json({ message: console.log(error.message) });
    res.status(400).json({ error });
  }
};

/**
 *   Get all posts
 * where: search user ID in DB with params
 * include: get author(user) datas
 */
const getAllPosts = async (req, res) => {
  try {
    const post = await prisma.post.findMany({
      include: {
        author: true,
        sharedPost: {
          include: {
            author: true,
            post: true,
          },
        },
        comments: {
          select: {
            id: true,
            author: true,
            textContent: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    res.status(200).json(post);
  } catch (error) {
    if (error.name) return res.status(400).json({ message: error.message });
    res.status(400).json({ error });
  }
};

/**
 *   Get post details by ID
 * where: search user ID in DB with params
 * include: get author(user) datas
 */
const getPostsById = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        author: true,
        sharedPost: {
          include: {
            author: true,
            post: true,
          },
        },
        comments: {
          select: {
            id: true,
            author: true,
            textContent: true,
          },
        },
      },
    });
    res.status(200).json(post);
  } catch (error) {
    if (error.name) return res.status(400).json({ message: error.message });
    res.status(400).json({ error });
  }
};

const createPost = async (req, res) => {
  const token = req.cookies.token;
  const decodedToken = jwt.verify(token, `${USER_TOKEN}`);
  const userId = decodedToken.userId;

  try {
    await Posts.postSchema.validate(req.body);
    const userPost = req.file
      ? {
          author: { connect: { id: userId } },
          textContent: req.body.textContent,
          imageUrl: `${req.protocol}://${req.get("host")}/images/posts/${
            req.file.filename
          }`,
        }
      : {
          author: { connect: { id: userId } },
          textContent: req.body.textContent,
          imageUrl: null,
        };
    await prisma.post.create({
      data: {
        ...userPost,
      },
    });
    res.status(201).json(userPost);
  } catch (error) {
    if (error.name)
      return res.status(401).json({ message: console.log(error.message) });
    res.status(400).json({ error });
  }
};

const sharePost = async (req, res) => {
  const token = req.cookies.token;
  const decodedToken = jwt.verify(token, `${USER_TOKEN}`);
  const userId = decodedToken.userId;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        author: true,
      },
    });

    await prisma.sharedPost.create({
      data: {
        author: { connect: { id: userId } },
        post: { connect: { id: post.id } },
      },
    });
    res.status(201).json(post);
  } catch (error) {
    if (error.name)
      return res.status(401).json({ message: console.log(error.message) });
    res.status(400).json({ error });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    await Posts.postSchema.validate(req.body);

    if (req.file && post.imageUrl) {
      const filename = post.imageUrl.split("/images/posts/")[1];
      fs.unlink(`images/posts/${filename}`, (err) => {
        if (err) return err;
      });
    }

    const userPost = req.file
      ? {
          textContent: req.body.textContent,
          imageUrl: `${req.protocol}://${req.get("host")}/images/posts/${
            req.file.filename
          }`,
        }
      : {
          textContent: req.body.textContent,
          imageUrl: post.imageUrl,
        };

    const postUpdate = await prisma.post.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        ...userPost,
      },
    });
    res.status(201).json(userPost);
  } catch (error) {
    if (error.name)
      return res.status(401).json({ message: console.log(error.message) });
    res.status(400).json({ error });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await prisma.post.delete({
      where: {
        id: Number(req.params.id),
      },
      select: {
        imageUrl: true,
      },
    });
    if (post.imageUrl) {
      const filename = post.imageUrl.split("/images/posts/")[1];
      fs.unlink(`images/posts/${filename}`, (err) => {
        if (err) return err;
      });
    }

    res.status(200).json({ message: "Post supprimé" });
  } catch (error) {
    if (error.name) return res.status(401).json({ message: error.message });
    res.status(401).json({ error });
  }
};

module.exports = {
  getAllPosts,
  getPostsById,
  createPost,
  sharePost,
  getPostsAndShared,
  updatePost,
  deletePost,
};
