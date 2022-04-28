import { setLocale } from "yup";
import * as yup from "yup";

setLocale({
  string: {
    default: "Le champ n'est pas valide",
  },
});

/* Schema for validation of register form on register page */
export const registerSchema = yup
  .object({
    username: yup
      .string()
      .matches(/^([A-Za-z]+[-'\s]?){3,16}$/, {
        message: "Veuillez vérifier la validité de votre pseudo",
        excludeEmptyString: true,
      })
      .required("Le pseudo doit contenir entre 3 et 16 caractères"),
    email: yup
      .string()
      .email("L'adresse mail doit être valide")
      .required("L'adresse mail doit être valide"),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        {
          message:
            "Le mot de passe doit contenir au minimum 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial",
          excludeEmptyString: true,
        }
      )
      .min(
        6,
        "Le mot de passe doit contenir au minimum 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial"
      )
      .required(
        "Le mot de passe doit contenir au minimum 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial"
      ),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Les mots de passe doivent être similaires"
      )
      .required("Les mots de passe doivent être similaires"),
  })
  .required();

/* Schema for validation of login form on login page */
export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("L'adresse mail doit être valide")
      .required("L'adresse mail doit être valide"),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        {
          message:
            "Le mot de passe doit contenir au minimum 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial",
        }
      )
      .min(
        6,
        "Le mot de passe doit contenir au minimum 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial"
      )
      .required(
        "Le mot de passe doit contenir au minimum 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial"
      ),
  })
  .required();

  export const updateUsernameSchema = yup
  .object({
    newUsername: yup
    .string()
    .matches(/^([A-Za-z]+[-'\s]?){3,16}$/, {
      message: "Veuillez vérifier la validité de votre pseudo",
      excludeEmptyString: true,
    })
    .required("Le pseudo doit contenir entre 3 et 16 caractères"),
  })
  .required();

  export const updatePasswordSchema = yup
  .object({
    newPassword: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        {
          message:
            "Le mot de passe doit contenir au minimum 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial",
          excludeEmptyString: true,
        }
      )
      .min(
        6,
        "Le mot de passe doit contenir au minimum 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial"
      )
      .required(
        "Le mot de passe doit contenir au minimum 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial"
      ),
    confirmNewPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Les mots de passe doivent être similaires"
      )
      .required("Les mots de passe doivent être similaires"),
  })
  .required();
