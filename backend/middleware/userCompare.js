const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const USER_TOKEN = process.env.USER_TOKEN;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
      select: {
        firstName: true,
        lastName: true,
        profilePicture: true,
      },
    });
    if (!token) {
      return res.status(401).json("Veuillez vous connecter");
    }
    const decodedToken = jwt.verify(token, `${USER_TOKEN}`);
    const userId = decodedToken.userId;

    // Compare sauce userId & token's one
    if (user.id && user.id !== userId) {
      throw "User ID non valable";
    } else {
      next();
    }
  } catch (error) {
    if (error.name) return res.status(401).json({ message: error.message });
    res.status(403).json({ error: "Action interdite" });
  }
};
