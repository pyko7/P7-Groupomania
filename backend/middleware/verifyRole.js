const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const USER_TOKEN = process.env.USER_TOKEN;

/**
 * get the token, if it doesn't exists return 401 status
 * get userId in DB
 * Decode the token to get encrypted userId when user logged in
 * Compare userId in DB and userId inside the token, any action is forbidden
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
      select: {
        id: true,
        role: true,
      },
    });

    const decodedToken = jwt.verify(token, `${USER_TOKEN}`);
    const role = decodedToken.role;

    if (role && role !== 1) {
      return res.status(403).json({ message: "Action interdite" });
    } else {
      next();
    }
  } catch (error) {
    if (error.name) return res.status(401).json({ message: error.message });
    res.status(403).json({ error: "Action interdite" });
  }
};
