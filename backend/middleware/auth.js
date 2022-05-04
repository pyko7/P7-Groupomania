const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const USER_TOKEN = process.env.USER_TOKEN;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split("")[1];
    const decodedToken = jwt.verify(token, `${USER_TOKEN}`);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non valable";
    } else {
      next();
    }
  } catch (error) {
    res.status(403).json({ error });
  }
};
