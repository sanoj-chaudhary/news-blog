// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import { toast } from 'react-toastify';
import { useFormik } from 'formik'
// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'

import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import Image from 'next/image'
import { changePasswordSchema } from '../../../../utils/ValidationSchema'
import { changePassword } from '../../../http/auth-apis'
import { getAccessToken } from '../../../../utils'
const TabSecurity = () => {
  // ** States
  const [passValue, setPassValue] = useState({

    showNewPassword: false,

    showCurrentPassword: false,
    showConfirmNewPassword: false
  })

  const [inputValue, setInputValue] = useState(
    {
      newPassword: "", currentPassword: "", confirmNewPassword: ""
    }
  );


  const handleClickShowCurrentPassword = () => {
    setPassValue({ ...passValue, showCurrentPassword: !values.showCurrentPassword })
  }

  const handleMouseDownCurrentPassword = event => {
    event.preventDefault()
  }



  const handleClickShowNewPassword = () => {
    setPassValue({ ...passValue, showNewPassword: !values.showNewPassword })
  }

  const handleMouseDownNewPassword = event => {
    event.preventDefault()
  }


  const handleClickShowConfirmNewPassword = () => {
    setPassValue({ ...passValue, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const handleMouseDownConfirmNewPassword = event => {
    event.preventDefault()
  }

  const { values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: inputValue,
      validationSchema: changePasswordSchema,
      onSubmit: async (values, action) => {
        try {
            const updateData = {
              "oldpassword":values.currentPassword,
              "newpassword": values.newPassword
            }

          const res = await changePassword(updateData);
      

          if(res.data.bool){
            toast.success('Password update Successfully', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
              action.resetForm();
          }
        } catch (error) {
          toast.error('!omething went wrong', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log(error)
        }

      },
    });


  return (
    <form onSubmit={handleSubmit}>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: '30px' }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-current-password'>Current Password</InputLabel>
                  <OutlinedInput
                    label='Current Password'
                    value={values.currentPassword}
                    id='account-settings-current-password'
                    type={values.showCurrentPassword ? 'text' : 'password'}
                    name="currentPassword"
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={handleMouseDownCurrentPassword}
                        >
                          {passValue.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {errors.currentPassword && touched.currentPassword ? (
                  <p className="form-error">{errors.currentPassword}</p>
                ) : null}
              </Grid>

              <Grid item xs={12} sx={{ marginTop: '-10px' }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-new-password'>New Password</InputLabel>
                  <OutlinedInput
                    label='New Password'
                    value={values.newPassword}
                    id='account-settings-new-password'
                    name="newPassword"
                    onChange={handleChange}
                    type={passValue.showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowNewPassword}
                          aria-label='toggle password visibility'
                          onMouseDown={handleMouseDownNewPassword}
                        >
                          {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {errors.newPassword && touched.newPassword ? (
                  <p className="form-error">{errors.newPassword}</p>
                ) : null}
              </Grid>

              <Grid item xs={12} sx={{ marginTop: '-10px' }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-confirm-new-password'>Confirm New Password</InputLabel>
                  <OutlinedInput
                    label='Confirm New Password'
                    value={values.confirmNewPassword}
                    id='account-settings-confirm-new-password'
                    type={passValue.showConfirmNewPassword ? 'text' : 'password'}
                    name="confirmNewPassword"
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownConfirmNewPassword}
                        >
                          {passValue.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {errors.confirmNewPassword && touched.confirmNewPassword ? (
                  <p className="form-error">{errors.confirmNewPassword}</p>
                ) : null}
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}
          >
            <Image width={183} alt='avatar' height={256} src='/images/andrea.png' />
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ margin: 0 }} />

      <CardContent>


        <Box sx={{ mt: 1.75, display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              maxWidth: 368,
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
          </Box>
        </Box>

        <Box >
          <Button type='submit' variant='contained' sx={{ marginRight: 3.5 }}>
            Save Changes
          </Button>
          <Button
            type='reset'
            variant='outlined'
            color='secondary'
            onClick={() => setFieldValue({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })}
          >
            Reset
          </Button>
        </Box>
      </CardContent>
    </form>
  )
}

export default TabSecurity
