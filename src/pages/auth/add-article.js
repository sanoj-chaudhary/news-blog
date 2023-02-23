import dynamic from 'next/dynamic'
import AllArticle from '../../components/auth/AllArticle'

import { useFormik } from 'formik'
import { useState, useEffect } from 'react'
// import { menuCountry } from './../../http'


import { addArticleApi, updateArticleById } from '../../http/auth-apis'
import FormData from 'form-data'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from './../../../redux/categorySlice';
import { fetchCountry } from './../../../redux/countrySlice';
import { toast } from 'react-toastify';
const Editor = dynamic(() => import('./../../components/Editor'), {
  ssr: false
})
import Preview from '../../components/Preview'
import { getAccessToken, setAccessToken, InputField, SelectBox, InputFile } from '../../../utils'
import { getSingleArticleById } from '../../http'

const AddArticle = ({ lable, editdata, data }) => {
  const [preview, setPreview] = useState(false);
  const [addStatus, setAddStatus] = useState(false)
  const [articleStatus, setArticleStatus] = useState(false)
  const [status, setStatus] = useState(false)
  const [token, setToken] = useState()
  const dispatch = useDispatch();
  const { data: category } = useSelector((state) => state.category);
  const { data: country } = useSelector((state) => state.country);
  const [article, setArticle] = useState()
  const [description, setDescription] = useState()

  const [editPost, setEditPost] = useState({
    categoryid: "", countryid: "", title: "", image: "", video: "", description: ""
  })

  const getArticleData = async () => {
    try {
      const json_data = {
        "articleid": editdata
      }
      const headers = {
        'Authorization': `Bearer ${token}`,
      }
      const { data } = await getSingleArticleById(json_data,headers);
      if (data) {
        setEditPost({ ...editPost, ['categoryid']: 5 })
        setArticle(data.data);
        setStatus(true)
      }
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {

    setToken(getAccessToken())
    dispatch(fetchCategory());
    dispatch(fetchCountry());

    getArticleData()

  }, []);




  const [inputValue, setInputValue] = useState(
    {
      categoryid: "", countryid: "", title: "", image: "", video: "", description: ""
    }
  );

  const { values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: inputValue,
      validationSchema: "",
      onSubmit: async (values, action) => {
        try {

          const formData = new FormData();
          for (const property in values) {
            formData.append(property, values[property])
          }
          formData.append('status', articleStatus)


          const headers = {
            'Authorization': `Bearer ${token}`,
          }
          const res =  await addArticleApi(formData,headers);
          if (res.data.bool) {
            toast.success(`${lable !== "editPost" ? 'Add article successfully' : 'Update article successfully'}`, {
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


  const formSubmit = () => {
    handleSubmit()
  }




  if (!status) {
    return <h3>Loading....</h3>
  }
  return (

    <>
      <div className='scrn-container bg-white pt-4 px-3 mt-4'>
        <div className='buttonWrapper pb-4 mt-0'>


          {preview && <><button className='btn btn-bg px-4' type='button' form="add-article" onClick={() => formSubmit()}>Send for approval</button>
            <button className='btn btn-outline-bg ms-3'
              onClick={() => {
                setPreview(false)
              }} >
              Edit Post
            </button>
          </>
          }

          {!preview &&
            <>
              <button className='btn btn-outline-bg me-3' onClick={() => setPreview(true)}>Preview</button>
              <button className='btn btn-bg px-4' type='button' onClick={() => formSubmit()} >Send for approval</button>
            </>
          }
        </div>
        <hr className='my-0 py-4' />

      </div>
      {
        preview ?
          <Preview values={values} />
          :

          <div className='scrn-container'>
            <div className='editorWrapper pb-4 row mx-0'>
              <div className='addArticleWrapper col-md-8 add-article'>
                <form id='add-article' >
                  <div className='row'>
                    <div className='col-md-12 mt-3'>
                      <SelectBox name={'categoryid'} value={values.categoryid} options={category} label={'Article Category'} onChange={handleChange} />
                      {errors.categoryid && touched.categoryid ? (
                        <p className="form-error">{errors.categoryid}</p>
                      ) : null}
                    </div>
                    <div className='col-md-12 mt-3' style={{ marginTop: "10px" }}>
                      <SelectBox name={'countryid'} value={values.countryid} options={country} label={'Article Country'} onChange={handleChange} />
                      {errors.countryid && touched.countryid ? (
                        <p className="form-error">{errors.countryid}</p>
                      ) : null}
                    </div>
                    <div className='col-md-12 mt-2' style={{ marginTop: "10px" }}>
                      <InputField type={'text'} name={'title'} value={values.title} label={'Title'} onChange={handleChange} />
                      {errors.title && touched.title ? (
                        <p className="form-error">{errors.title}</p>
                      ) : null}
                    </div>
                    <div className='col-md-12 mt-3 attachment_load'>
                      <label className="form-label fw-bold">Image</label>
                      <InputFile type={'file'} className="attachment_load" name={'image'} value={values.username} onChange={(e) => setFieldValue('image', e.currentTarget.files[0])} style={{ padding: "14px 14px 18px 14px" }} />
                      {errors.image && touched.image ? (
                        <p className="form-error">{errors.image}</p>
                      ) : null}
                    </div>
                    <div className='col-md-12 mt-3'>
                      <label className="form-label fw-bold">Video URL</label>
                      <InputField type={'text'} name={'video'} value={values.video} label={'Video URL'} onChange={handleChange} />
                      {errors.video && touched.video ? (
                        <p className="form-error">{errors.video}</p>
                      ) : null}
                    </div>
                    <div className='col-md-12 mt-3'>
                      <label className="form-label fw-bold">Body Section</label>
                      <Editor name="description"
                        setDescription={setDescription}
                        value={description}
                        setFieldValue={setFieldValue}
                        onChange={handleChange}
                      />
                      {errors.lname && touched.lname ? (
                        <p className="form-error">{errors.lname}</p>
                      ) : null}
                    </div>



                  </div>
                  <div className='d-flex align-items-center mt-2'>


                  </div>

                </form>
              </div>

              <div className='articleStatusWrapper col-md-4'>
                <div className=''>
                  <h5>Are you ready to send for approval?</h5>
                  <small>Double-check your settings before publishing.</small>
                </div>

                <hr />
                <div className=''>
                  <h5 className='mb-3'>Visibility</h5>
                  <small>Control how this post is viewed.</small>
                </div>
                <div className=''>
                  <div className="form-check my-3">
                    <input className="form-check-input" onChange={(e) => setArticleStatus(e.target.value)} type="radio" name="articleStatus" id="exampleRadios1" value="public" />
                    <label className="form-check-label" htmlFor="exampleRadios1">
                      Public
                    </label>
                    <br />
                    <small>Control how this post is viewed.</small>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" onChange={(e) => setArticleStatus(e.target.value)} type="radio" name="articleStatus" id="exampleRadios2" value="Private" />
                    <label className="form-check-label" htmlFor="exampleRadios2">
                      Private
                    </label>
                    <br />
                    <small>Only visible to site admins and editors.</small>
                  </div>
                </div>


              </div>
            </div>

          </div>
      }


    </>
  )


}

export default AddArticle


