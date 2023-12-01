import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  username: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});


export const RegisterValidationSchema = yup.object().shape({
  username: yup.string()
  .min(4, ({ min }) => `Username must be at least ${min} characters`)
  .required("Username is Required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  contactNumber: yup.string()
    .matches(/^[0-9]+$/, 'Phone number must only contain digits')
    .min(10, 'Phone number must be at least 10 characters')
    .required('Phone number is required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Please re-type your password")
    // use oneOf to match one of the values inside the array.
    // use "ref" to get the value of passwrod.
    .oneOf([yup.ref("password")], "Passwords does not match")
});
