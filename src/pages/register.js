import Link from 'next/link'
import { InputField, SelectBox } from './../../utils'
import Head from 'next/head'
import { useState } from 'react'
import { registerSchema } from './../../utils/ValidationSchema'
import { userRegister } from './../http'
import Router from 'next/router'
import { useFormik } from 'formik'
import { toast } from 'react-toastify';




const Register = () => {

  const roleOption = [
    {
      id: 'Reader',
      title: 'Reader',
    },
    {
      id: 'Author',
      title: 'Author',
    },

  ];

  const [active, setActive] = useState(false)
  const [inputValue, setInputValue] = useState(
    {
      username: "", email: "", name: "", password: "", confirm_password: "", role: "Author", mobile: ""
    }
  );

  const { values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: inputValue,
      validationSchema: registerSchema,
      onSubmit: async (values, action) => {

        try {
          setActive(true)
          const res = await userRegister(values);
          if (res.data) {
            toast.success('Signup success login now', {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            Router.push('/login')
            setActive(false)
          } else {
            toast.error(`${res.data.errors.email}`, {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        } catch (error) {
          toast.error(`Something went wrong!`, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log("message", error.message);
          setActive(false)
        }
      },
    });
  return (

    <>
      <Head>
        <link href={'/css/login.css'} rel={'stylesheet'} />
      </Head>
      <div className='registerWrapper my-4'>
        <form onSubmit={handleSubmit}>

        <fieldset className="login-form">
                    <legend><h4 className="fw-bold">Sign Up</h4></legend>
        


          <div className='row'>
            <div className='col-md-12 mt-2'>
              <InputField type={'email'} name={'email'} value={values.email} label={'Email'} onChange={handleChange} />
              {errors.email && touched.email ? (
                <p className="form-error">{errors.email}</p>
              ) : null}
            </div>
            <div className='col-md-12'>
              <InputField type={'text'} name={'username'} value={values.username} label={'Username'} onChange={handleChange} />
              {errors.username && touched.username ? (
                <p className="form-error">{errors.username}</p>
              ) : null}
            </div>
            <div className='col-md-12'>
              <InputField type={'text'} name={'name'} value={values.fname} label={'Name'} onChange={handleChange} />
              {errors.name && touched.name ? (
                <p className="form-error">{errors.name}</p>
              ) : null}
            </div>
            {/* <div className='col-md-6'>
              <InputField type={'text'} name={'lname'} value={values.lname} label={'Last Name'} onChange={handleChange} />
              {errors.lname && touched.lname ? (
            <p className="form-error">{errors.lname}</p>
          ) : null}
            </div> */}
            <div className='col-md-12'>
              <SelectBox name={'role'} options={roleOption} label={'Sign Up as'} onChange={handleChange} />
              {errors.role && touched.role ? (
                <p className="form-error">{errors.role}</p>
              ) : null}
            </div>
            <div className='col-md-12 mt-4'>
              <InputField type={'text'} name={'mobile'} value={values.mobile} label={'Mobile Number'} onChange={handleChange} />
              {errors.mobile && touched.mobile ? (
                <p className="form-error">{errors.mobile}</p>
              ) : null}
            </div>
            <div className='col-md-6'>
              <InputField type={'password'} name={'password'} value={values.password} label={'Password'} onChange={handleChange} />
              {errors.password && touched.password ? (
                <p className="form-error">{errors.password}</p>
              ) : null}
            </div>
            <div className='col-md-6 '>
              <InputField type={'password'} className="pb-1" name={'confirm_password'} value={values.confirm_password} label={'Confirm Password'} onChange={handleChange} />
              {errors.confirm_password && touched.confirm_password ? (
                <p className="form-error">{errors.confirm_password}</p>
              ) : null}
            </div>

            <div className="col d-flex ">

              {/* <div className="form-check">
                <input className="form-check-input" type="checkbox" value="values." id="form2Example31" />
                <label className="form-check-label" htmlFor="form2Example31"> Show Password </label>
              </div> */}
            </div>
            <div className='col-md-12 mt-4'>

              <button type="submit" disabled={active} className="mb-4 signupBtn" >Sign Up {active ? <i className="fa fa-spinner fa-spin"></i> : ''}</button>
            </div>

            <div className="text-center">



              <div className='row'>
                <div className='col-md-12'>
                  Already have an account? <Link href={'/login'} className="text-decoration-none"> Sign In</Link>
                </div>

              </div>
            </div>
          </div>

          </fieldset>
        </form>
      </div>

    </>
  )
}

export default Register