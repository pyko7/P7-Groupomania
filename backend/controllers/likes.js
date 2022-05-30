const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const dotenv = require("dotenv");
dotenv.config();
const USER_TOKEN = process.env.USER_TOKEN;
const jwt = require("jsonwebtoken");

/**
 *   Get likes
 * where: search likes array in post DB with params
 * select: select only the like array
 */
const getLikes = async (req, res) => {
  try {
    const likesCount = await prisma.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
      select: {
        like: true,
      },
    });
    res.status(200).json(likesCount);
  } catch (error) {
    if (error.name) return res.status(401).json(console.log(error.message));
    res.status(400).json({ error });
  }
};

/**
 *   Like post
 * target the post that we'll be liked
 * hasLike allows to check if the user has already liked the post
 * if hasLike array length = 0 means that the user hasn't liked the post yet
 * a like is created in the like table
 * else it means that the post is already liked by the user
 * the like is deleted from the like table
 */
const likePost = async (req, res) => {
  const token = req.cookies.token;
  const decodedToken = jwt.verify(token, `${USER_TOKEN}`);
  const userId = decodedToken.userId;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        like: true,
      },
    });

    const hasLike = await prisma.like.findMany({
      where: {
        AND: [{ authorId: userId }, { postId: post.id }],
      },
    });

    if (hasLike.length === 0) {
      await prisma.like.create({
        data: {
          author: { connect: { id: userId } },
          post: { connect: { id: post.id } },
          isLike: true,
        },
      });
    } else {
      await prisma.like.delete({
        where: {
          id: hasLike[0].id,
        },
      });
    }

    res.status(200).json({ message: "Action prise en compte" });
  } catch (error) {
    if (error.name) return res.status(401).json(console.log(error.message));
    res.status(400).json({ error });
  }
};

module.exports = {
  getLikes,
  likePost,
};
