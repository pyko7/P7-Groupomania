const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const fs = require("fs");

const dotenv = require("dotenv");
dotenv.config();
const USER_TOKEN = process.env.USER_TOKEN;
const jwt = require("jsonwebtoken");

const Posts = require("../models/Posts");

/**
 *   Get all posts
 * where: search user ID in DB with params
 * include: get author (=user) datas, look for users who shared the post & every comment of each post
 */
const getAllPosts = async (req, res) => {
  try {
    const post = await prisma.post.findMany({
      include: {
        author: true,
        sharedBy: true,
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
 * include: get author (=user) datas & every comment the post
 */
const getPostsById = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        author: true,
        sharedBy: true,
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

/**
 *   Create a post
 * get the userId with the token
 * check if there's an image in the post or not
 * to get author datas, we use connect to connect with user table (see relation in Prisma Schema)
 * if there's a file, it get a new filename, if not its value is null
 * create the post in the post table
 */

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
    if (error.name) return res.status(401).json({ message: error.message });
    res.status(400).json({ error });
  }
};

/**
 *   Share a post
 * get the userId with the token
 * find the post with the params id
 * create a new post with the exact same datas
 * sharedBy property is the user that shares the psot 
 * this new post is stored in the post table
 */

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

    await prisma.post.create({
      data: {
        author: { connect: { id: post.author.id } },
        textContent: post.textContent,
        imageUrl: post.imageUrl,
        sharedBy: { connect: { id: userId } },
      },
    });
    res.status(201).json(post);
  } catch (error) {
    if (error.name) return res.status(401)
    .json( console.log(error.message));
    res.status(400).json({ error });
  }
};

/**
 *   Update a post
 * find the post with the params id
 * check if there's an image in the post or not
 * if there's a file and the post already has an image, the previous one is deleted
 * if there's a file, it get a new filename, if not its value doesn't change
 * the post is updated & saved in post table
 */

const updatePost = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

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

    await Posts.postSchema.validate(req.body);

    await prisma.post.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        ...userPost,
      },
    });
    res.status(201).json(userPost);
  } catch (error) {
    if (error.name) return res.status(401).json({ message: error.message });
    res.status(400).json({ error });
  }
};

/**
 *   Delete a post
 * find the post with the params id
 * if it contains an image, this one is deleted
 * the post is delete from the post table
 */

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
  updatePost,
  deletePost,
};
