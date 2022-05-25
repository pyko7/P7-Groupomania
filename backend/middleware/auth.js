const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const USER_TOKEN = process.env.USER_TOKEN;

/**
 * get the token, if it doesn't exists return 401 status
 * decode the token to get encrypted userID when user logged in
 * compare req.id & token ID, if they are different it means that the user isn't log
 */
module.exports = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json("Veuillez vous connecter");
    }
    const decodedToken = jwt.verify(token, `${USER_TOKEN}`);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      return res.status(403).json({ message: "Veuillez vous connecter" });
    } else {
      next();
    }
  } catch (error) {
    if (error.name) return res.status(401).json({ message: error.message });
    res.status(403).json({ error: "erreur d'identification" });
  }
};
