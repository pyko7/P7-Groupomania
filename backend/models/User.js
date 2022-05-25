const yup = require("yup");

/* Schema for validation of register form on register page */
const registerSchema = yup
  .object({
    firstName: yup
      .string()
      .required("Veuillez entrer un prénom")
      .matches(/^([A-Za-z]+[-'\s]?){2,35}$/, {
        message: "Veuillez vérifier la validité du champ de texte",
        excludeEmptyString: true,
      }),
    lastName: yup
      .string()
      .required("Veuillez entrer un nom")
      .matches(/^([A-Za-z]+[-'\s]?){2,35}$/, {
        message: "Veuillez vérifier la validité du champ de texte",
        excludeEmptyString: true,
      }),

    email: yup
      .string()
      .required("Veuillez entrer une adresse email")
      .email("L'adresse mail doit être valide"),

    password: yup
      .string()
      .required("Veuillez entrer un mot de passe")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        {
          message:
            "Le mot de passe doit contenir au moins 1 minuscule ,1 majuscule, 1 chiffre et 1 caractère spécial",
        }
      )
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"),

    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Les mots de passe doivent être similaires"
      )
      .required("Veuillez confirmer votre mot de passe"),
  })
  .required();

/* Schema for validation of login form on login page */
const loginSchema = yup
  .object({
    email: yup
      .string()
      .required("Veuillez entrer une adresse email")
      .email("L'adresse mail doit être valide"),

    password: yup
      .string()
      .required("Veuillez entrer un mot de passe")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        {
          message:
            "Le mot de passe doit contenir au moins 1 minuscule ,1 majuscule, 1 chiffre et 1 caractère spécial",
        }
      )
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  })
  .required();

const updateUserProfile = yup
  .object({
    firstName: yup
      .string()
      .required("Veuillez entrer un prénom")
      .matches(/^([A-Za-z]+[-'\s]?){2,35}$/, {
        message: "Veuillez vérifier la validité du champ de texte",
        excludeEmptyString: true,
      }),
    lastName: yup
      .string()
      .required("Veuillez entrer un nom")
      .matches(/^([A-Za-z]+[-'\s]?){2,35}$/, {
        message: "Veuillez vérifier la validité du champ de texte",
        excludeEmptyString: true,
      }),
  })
  .required();

const updatePasswordSchema = yup
  .object({
    password: yup
      .string()
      .required("Veuillez entrer un mot de passe")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        {
          message:
            "Le mot de passe doit contenir au moins 1 minuscule ,1 majuscule, 1 chiffre et 1 caractère spécial",
        }
      )
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Les mots de passe doivent être similaires"
      )
      .required("Veuillez confirmer votre mot de passe"),
  })
  .required();

module.exports = {
  registerSchema,
  loginSchema,
  updateUserProfile,
  updatePasswordSchema,
};
