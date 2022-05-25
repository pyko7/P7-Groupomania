const yup = require("yup");

/* Schema for validation of text for posts & comments */
const postSchema = yup
  .object({
    textContent: yup
      .string()
      .min(2)
      .max(280)
      .matches(/^(?!\s*$).+$/gm)
      .required("Veuillez saisir au minimum 2 caractères"),
  })
  .required();

module.exports = {
  postSchema,
};
