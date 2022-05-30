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
 * include: author: look for users who wrote the post
 * include: comments: look for every comment of each post including their author
 */
const getAllPosts = async (req, res) => {
  try {
    const post = await prisma.post.findMany({
      include: {
        author: true,
        like: {include:{
          author:true,
          post:true,
        }
        },
        comments: {
          include: {
            author: true,
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
 * include: author: look for users who wrote the post
 * include: comments: look for every comment of the post including their author
 */
const getPostsById = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        author: true,
        like:true,
        comments: {
          include: {
            author: true,
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
 * verify if the user has already shared the post or not
 * to do that, we check in the array of user written posts, if some posts contains an existing value in the column originalPostId
 * if it does, it means that it's a shared post
 * find the post that the user wants to share with the params id
 * in the loop we check if the post id is equal to an id in the column of originalPostId of the user
 * if it does we throw a new error
 * if it doesn't exist we create a new post with the exact same datas
 * this new post is stored in the post table
 */

const sharePost = async (req, res) => {
  const token = req.cookies.token;
  const decodedToken = jwt.verify(token, `${USER_TOKEN}`);
  const userId = decodedToken.userId;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        writtenPosts: {
          select: {
            originalPostId: true,
          },
        },
      },
    });
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        author: true,
      },
    });

    user.writtenPosts.forEach((element) => {
      if (element.originalPostId === post.id)
        throw new Error("Le post a déjà été partagé");
    });

    await prisma.post.create({
      data: {
        author: { connect: { id: userId } },
        originalPostId: post.id,
        textContent: post.textContent,
        imageUrl: post.imageUrl,
      },
    });
    res.status(201).json(post);
  } catch (error) {
    if (error.name) return res.status(401).json(console.log(error.message));
    res.status(400).json({ error });
  }
};

/**
 *   Update a post
 * find the post with the params id
 * check the textContent validity
 * the post is updated & saved in post table
 */

const updatePost = async (req, res) => {
  const { textContent } = req.body;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    await Posts.postSchema.validate(req.body);

    await prisma.post.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        textContent: textContent,
      },
    });
    res.status(201).json({ message: "Le post a été modifié" });
  } catch (error) {
    if (error.name) return res.status(401).json({ message: error.message });
    res.status(400).json({ error });
  }
};

/**
 *   Delete a post
 * find the post with the params id
 * deleteMany with OR operator allows to delete the post as well as every post that shares the original post
 * if it contains an image, this one is deleted
 * the post is delete from the post table
 */

const deletePost = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    await prisma.post.deleteMany({
      where: {
        OR: [{ originalPostId: post.id }, { id: post.id }],
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

/**
 *   Delete a shared post
 * find the post with the params id
 * the post is delete from the post table
 */

const deleteSharedPost = async (req, res) => {
  try {
    const post = await prisma.post.delete({
      where: {
        id: Number(req.params.id),
      },
    });
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
  deleteSharedPost,
};
