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
    if (!token) {
      res.status(401).json({ error: "erreur de token" });
    }

    res.status(200).json({ userId: user.id, token });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
      select: {
        firstName: true,
        lastName: true,
      },
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: "erreur" });
  }
};

const updateProfile = async (req, res) => {
  const { firstName, lastName } = req.body;
  try {
    await User.updateUserProfile.validate(req.body);
    const user = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        firstName: firstName,
        lastName: lastName,
      },
    });
    res.status(200).json({ message: "Informations modifiées" });
  } catch (error) {
    res.status(401).json({ error });
  }
};

const updatePassword = async (req, res) => {
  const id = Number(req.params.id);
  const { currentPassword, password } = req.body;
  try {
    const userPassword = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    const isValid = await bcrypt.compare(
      currentPassword,
      userPassword.password
    );
    if (!isValid)
      return res.status(400).json({ message: "Mot de passe invalide" });
    await User.updatePasswordSchema.validate(req.body);
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: hash,
      },
    });
    res.status(200).json({ message: "Mot de passe modifié" });
  } catch (error) {
    res.status(401).json({ error });
  }
};
const deleteProfile = async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json({ message: "Compte supprimé" });
  } catch (error) {
    if (error.name) return res.status(401).json({ message: error.message });
    res.status(401).json({ error });
  }
};

module.exports = {
  createUser,
  logUser,
  getUserById,
  updateProfile,
  updatePassword,
  deleteProfile,
};
