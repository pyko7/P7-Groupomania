const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const fs = require("fs");

const dotenv = require("dotenv");
dotenv.config();
const USER_TOKEN = process.env.USER_TOKEN;
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const User = require("../models/User");

/**
 *   Create an user
 * check input validity with a yup's schema
 * hash the password, 10 is the number of round for salt
 * get the data from req and send them to DB
 * if email already exists, a prisma error code 2002 is send with an error message
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
        profilePicture: "http://localhost:3000/images/users/logo.png",
        role: 2,
      },
    });

    res.status(200).json({ message: "Utilisateur créé" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(401).json({ message: "Email déjà utilisé" });
      }
    }
    if (error.name) return res.status(401).json({ message: error.message });
    res.status(400).json({ error });
  }
};

/**
 *   Login to website
 * check input validity with a yup's schema
 * check authenticity of email, if value is null, email is invalid
 * compare hashed password & request password, if value is false, password is wrong
 * set the token into a htppOnly cookie (expires after 24h)
 * Return a JSON Object with a userId and the token
 */
const logUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    await User.loginSchema.validate(req.body);
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user === null) {
      return res
        .status(401)
        .json({ message: "Adresse email ou mot de passe incorrect" });
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return res
        .status(401)
        .json({ message: "Adresse email ou mot de passe incorrect" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      `${USER_TOKEN}`,
      {
        expiresIn: "24h",
      }
    );
    if (!token) {
      res.status(401).json({ error: "token invalide" });
    }

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 86400000,
    });
    res.status(200).json({ userId: user.id, token });
  } catch (error) {
    if (error.name) return res.status(401).json({ message: error.message });
    res.status(400).json({ error });
  }
};

/**
 * Logout function
 * Remove the token from the cookies
 */
const logOut = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Utilisateur déconnecté" });
  res.end();
};

/* Get each user from DB */
const getAllUsers = async (req, res) => {
  try {
    const user = await prisma.user.findMany({});
    res.status(200).json({ user });
  } catch (error) {
    if (error.name) return res.status(400).json({ message: error.message });
    res.status(400).json({ error });
  }
};

/**
 *   Get user datas by ID
 * where: search user ID in DB with params
 * select: get firstName & lastName because we only need those datas
 * for profile page
 */
const getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    if (error.name) return res.status(400).json({ message: error.message });
    res.status(400).json({ error });
  }
};

/**
 *    Update profile (firstName, lastName and profilePicture)
 * where: search user ID in DB with params
 * if there's a file (new profile picture):
 * check if user's profile picture is the default one or not
 * if it was a custom profile picture, this one is deleted and the new one is stored
 * gets datas & rename file url
 * if it's the default profile picture, the new one is stored and no images are deleted
 * if there's no file, gets datas & keep the same image (if the image doesn't exist, it's still null)
 * check inputs validity
 */
const updateProfile = async (req, res) => {
  const defaultPicture = "http://localhost:3000/images/users/logo.png";
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
      select: {
        profilePicture: true,
      },
    });

    if (req.file && user.profilePicture !== defaultPicture) {
      const filename = user.profilePicture.split("/images/users/")[1];
      fs.unlink(`images/users/${filename}`, (err) => {
        if (err) return err;
      });
    }
    const userUpdates = req.file
      ? {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          profilePicture: `${req.protocol}://${req.get("host")}/images/users/${
            req.file.filename
          }`,
        }
      : {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          profilePicture: user.profilePicture,
        };

    await User.updateUserProfile.validate(req.body);
    const userUpdate = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        ...userUpdates,
      },
    });
    res.status(200).json({ message: "Informations modifiées" });
  } catch (error) {
    if (error.name) return res.status(401).json({ message: error.message });
    res.status(401).json({ error });
  }
};

/**
 *   Update password
 * where: target the right user with its ID
 * compare req.password / DB password
 * if currentPassword is good, bcrypt hashes the new password
 * check input validity
 * update of the new password in DB
 */
const updatePassword = async (req, res) => {
  const id = Number(req.params.id);
  const { currentPassword, password } = req.body;
  try {
    const userPassword = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    await User.updatePasswordSchema.validate(req.body);

    const isValid = await bcrypt.compare(
      currentPassword,
      userPassword.password
    );
    if (!isValid)
      return res.status(400).json({ message: "Mot de passe invalide" });
    const hash = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: hash,
      },
    });
    res.status(200).json({ message: "Mot de passe modifié" });
  } catch (error) {
    if (error.name) return res.status(401).json({ message: error.message });
    res.status(401).json({ error });
  }
};

/**
 *   Delete account
 * where: target the right user with its ID
 * check if user's profile picture is the default profile picture
 * if it's the default profile picture, the image isn't deleted
 * if it is not, the profile picture is deleted
 * delete account from DB
 *
 */
const deleteProfile = async (req, res) => {
  const defaultPicture = "http://localhost:3000/images/users/logo.png";
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
      select: {
        profilePicture: true,
      },
    });
    if (user.profilePicture !== defaultPicture) {
      const filename = user.profilePicture.split("/images/users/")[1];
      fs.unlink(`images/users/${filename}`, (err) => {
        if (err) return err;
      });
    }
    res.status(200).json({ message: "Compte supprimé" });
  } catch (error) {
    if (error.name) return res.status(401).json({ message: error.message });
    res.status(401).json({ error });
  }
};

module.exports = {
  createUser,
  logUser,
  logOut,
  getAllUsers,
  getUserById,
  updateProfile,
  updatePassword,
  deleteProfile,
};
