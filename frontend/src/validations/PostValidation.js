import { setLocale } from "yup";
import * as yup from "yup";

setLocale({
  string: {
    default: "Le champ n'est pas valide",
  },
});

export const postSchema = yup
  .object({
    post: yup.string().min(2).max(280).trim().required(),
  })
  .required();
