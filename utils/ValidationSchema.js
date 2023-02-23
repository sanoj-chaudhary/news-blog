import * as Yup from 'yup'

export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
 
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  // role: Yup.string().required(),
  name: Yup.string().required(),
  // lname: Yup.string().required()
});

export const loginSchema = Yup.object().shape({
  username: Yup.string()
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required'),
  password: Yup.string().required('Password is required')
});


export const changePasswordSchema = Yup.object({
  currentPassword: Yup.string().required('Password is required'),
  newPassword: Yup.string().required('New password is required'),
  confirmNewPassword: Yup.string()
     .oneOf([Yup.ref('newPassword'), null], 'Passwords must match').required('Confirm password is required')
});