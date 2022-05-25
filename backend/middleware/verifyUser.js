const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const USER_TOKEN = process.env.USER_TOKEN;

/**
 *      Verify if user is allowed to update or delete his profile
 * get the token, if it doesn't exists return 401 status
 * get select userId & role in DB
 * Decode the token to get encrypted userId & role when user logged in
 * Compare userId in DB and userId inside the token, compare role value
 * if one of those is true, next() to the following middleware
 * if it's not equal any action is forbidden
 */

module.exports = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json("Veuillez vous connecter");
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    const decodedToken = jwt.verify(token, `${USER_TOKEN}`);
    const userId = decodedToken.userId;
    const role = decodedToken.role;
    if ((user.id && user.id === userId) || role === 1) {
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
