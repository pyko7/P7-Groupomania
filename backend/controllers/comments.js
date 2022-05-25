const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const dotenv = require("dotenv");
dotenv.config();
const USER_TOKEN = process.env.USER_TOKEN;
const jwt = require("jsonwebtoken");

const Posts = require("../models/Posts");

/**
 *   Create a comment
 * get the post ID
 * wait for validation of inputs
 * to get author datas, we use connect to connect user with the id contained in the token (see relation in Prisma Schema)
 * to get post datas, we use connect to connect with post table (see relation in Prisma Schema)
 * create the comment in the comment table
 */
const createComment = async (req, res) => {
  const token = req.cookies.token;
  const decodedToken = jwt.verify(token, `${USER_TOKEN}`);
  const userId = decodedToken.userId;
  const { textContent } = req.body;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    await Posts.postSchema.validate(req.body);

    await prisma.comment.create({
      data: {
        author: { connect: { id: userId } },
        post: { connect: { id: post.id } },
        textContent: textContent,
      },
    });
    res.status(201).json({ message: "Commentaire envoyé" });
  } catch (error) {
    if (error.name)
      return res.status(401).json({ message: console.log(error.message) });
    res.status(400).json({ error });
  }
};

/**
 *   Update a comment
 * get the post ID
 * wait for inputs validation
 * change textContent with req.body
 * comment is updated in comment table
 */

const updateComment = async (req, res) => {
  try {
    await Posts.postSchema.validate(req.body);

    await prisma.comment.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        ...req.body,
      },
    });
    res.status(201).json({ message: "Commentaire modifié" });
  } catch (error) {
    if (error.name)
      return res.status(401).json({ message: console.log(error.message) });
    res.status(400).json({ error });
  }
};

/**
 *   Delete a comment
 * get the post ID
 * comment is removed from comment table
 */
const deleteComment = async (req, res) => {
  try {
    await prisma.comment.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json({ message: "Commentaire supprimé" });
  } catch (error) {
    if (error.name) return res.status(401).json({ message: error.message });
    res.status(401).json({ error });
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
