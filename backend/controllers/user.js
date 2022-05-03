const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const dotenv = require("dotenv");
dotenv.config();
const USER_TOKEN = process.env.USER_TOKEN;
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const User = require("../models/User");

/**
 *   Create an user
 * verify input validity with a yup's schema
 * hash the password10 is the number of round for salt
 * get the data from req and send them to DB
 */
const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    await User.registerSchema.validate(req.body);
    const hash = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash,
      },
    });

    res.status(200).json({ message: "Utilisateur créé" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 *   Login to website
 * verify input validity with a yup's schema
 * verify authenticity of email, if value is null, email is invalid
 * compare hashed password & request password, if value is false, password is wrong
 * assign a authenticity token to allow user to access the website
 * Return a JSON Object with a userId and the token
 */
const logUser = async (req, res) => {
  const { email, password } = req.body;
  //verifier input
  try {
    await User.loginSchema.validate(req.body);
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user === null) {
      res.status(401).json({ message: "Utilisateur non trouvé" });
      return;
    }

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      res.status(401).json({ message: "Mot de passe incorrect" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, `${USER_TOKEN}`, {
      expiresIn: "24h",
    });

    res.status(200).json({ userId: user.id, token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { createUser, logUser };
