const yup = require("yup");

const postSchema = yup
  .object({
    textContent: yup
      .string()
      .min(2)
      .max(280)
      .matches(/^(?!\s*$).+$/)
      .required("Veuillez saisir au minimum 2 caractères"),
  })
  .required();

module.exports = {
  postSchema,
};
