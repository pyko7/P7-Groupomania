const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const USER_TOKEN = process.env.USER_TOKEN;

/**
 * get the token, if it doesn't exists return 401 status
 * get select userId & role in DB
 * Decode the token to get encrypted userId & role when user logged in
 * Compare userId of author in DB and userId inside the token, compare if role value
 * if one of those is true, next() to the following middleware
 * if it's not equal any action is prevented
 */

module.exports = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json("Veuillez vous connecter");
  }
  try {
    const decodedToken = jwt.verify(token, `${USER_TOKEN}`);
    const userId = decodedToken.userId;
    const role = decodedToken.role;
    const comment = await prisma.comment.findUnique({
      where: {
        id: Number(req.params.id),
      },
      select: {
          author: true
      }
    });
    if ((comment.author.id && comment.author.id === userId) || role === 1) {
      next();
    } else {
      res.status(403).json({ message: "Action interdite" });
      return;
    }
  } catch (error) {
    if (error.name) return res.status(401).json({ message: error.message});
    res.status(403).json({ error: "Action interdite" });
  }
};