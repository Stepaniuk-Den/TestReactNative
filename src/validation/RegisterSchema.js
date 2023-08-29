import * as Yup from "yup";

const username = Yup.string()
  .min(1, "username too Short!")
  .max(50, "username too Long!")
  .required("username is required");

const phoneRegExp = /^0\d{9}$/;

const phone = Yup.string()
  .matches(phoneRegExp, "Phone number is not valid")
  .required("Phone is required");

const email = Yup.string().email("Invalid email").required("Email is required");

const password = Yup.string()
  .min(2, "Password too Short!")
  .max(50, "Password too Long!")
  .required("Password is required");

const RegisterSchema = Yup.object().shape({
  username,
  phone,
  email,
  password,
});

export default RegisterSchema;
