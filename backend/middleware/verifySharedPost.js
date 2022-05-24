const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const USER_TOKEN = process.env.USER_TOKEN;

/**
 * get the token, if it doesn't exists return 401 status
 * get select userId & role in DB
 * decode the token to get encrypted userId & role when user logged in
 * compare userId of user who shared the post in DB and userId inside the token,
 * compare if role value
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
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if ((post.sharedById && post.sharedById === userId) || role === 1) {
      next();
    } else {
      res.status(403).json({ message: "Action interdite" });
      return;
    }
  } catch (error) {
    if (error.name) return res.status(401).json({ message: error.message });
    res.status(403).json({ error: "Action interdite" });
  }
};
