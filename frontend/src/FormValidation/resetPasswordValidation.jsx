import * as Yup from 'yup';

export const resetPasswordValidationSchema = Yup.object({
  currentpassword : Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required').matches(/^\S*$/, 'Password must not contain spaces'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required').matches(/^\S*$/, 'Password must not contain spaces'),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password not matched")
    .required('Confirm password')
    .matches(/^\S*$/, 'Confirm password must not contain spaces')
});