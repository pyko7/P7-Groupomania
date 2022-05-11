const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const USER_TOKEN = process.env.USER_TOKEN;

//get the token
//check if token has same value as the token
//get the decoded userID encrypted when user logged in
module.exports = async (req, res, next) => {
  // const token = req.cookies.token || "";
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (!token) {
      return res.status(401).json("Veuillez vous connecter");
    }
    const decodedToken = jwt.verify(token, `${USER_TOKEN}`);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non valable";
    } else {
      next();
    }
  } catch (error) {
    if (error.name) return res.status(401).json({ message: error.message });
    res.status(403).json({ error: "erreur d'identification" });
  }
};
