import { setLocale } from "yup";
import * as yup from "yup";

setLocale({
  string: {
    default: "Le champ n'est pas valide",
  },
});

export const postSchema = yup
  .object({
    textContent: yup
      .string()
      .min(2, "Veuillez saisir au minimum 2 caractères")
      .max(280)
      .matches(/^(?!\s*$).+$/, {
        message: "Veuillez saisir au minimum 2 caractères",
      })
      .required("Veuillez saisir au minimum 2 caractères"),
  })
  .required();
