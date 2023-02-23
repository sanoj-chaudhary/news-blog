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
import { useRouter } from 'next/router'
const AddArticle = () => {
  const router = useRouter()
  const [preview, setPreview] = useState(false);
  const [addStatus, setAddStatus] = useState(false)
  const [articleStatus, setArticleStatus] = useState(false)
  const [status, setStatus] = useState(false)
  const [token, setToken] = useState()
  const dispatch = useDispatch();
  const { data: category } = useSelector((state) => state.category);
  const { data: country } = useSelector((state) => state.country);
  const [editData, setEditData] = useState()
  const [description, setDescription] = useState()


  const [editPost, setEditPost] = useState({
    categoryid: "", countryid: "", title: "", image: "", video: "", description: ""
  })


  const getArticleData = async () => {
    try {
      const json_data = {
        "articleid": router.query.id
      }
      const headers = {
        'Authorization': `Bearer ${token}`,
      }
      const { data } = await getSingleArticleById(json_data,headers);
      if (data) {

        console.log({data})
        setEditData(data.data)
        setEditPost({
          ...editPost,
          ['categoryid']: data.data.category_id,
          ['countryid']: data.data.country_id,
          ['title']: data.data.title,
          ['video']: data.data.video,
        });

        setDescription(data.data.description)
        setStatus(true)
      }
    } catch (error) {
      console.log(error)
    }

  }



  const handleChange = event => {

    setEditPost({
      ...editPost,
      [event.target.name]: event.target.value
    });

    console.log({ editPost })
  };

  const handleImageChange = event => {
    setEditPost({
      ...editPost,
      image: event.target.files[0]
    });
  };
const setFieldValue = ()=>{}

  const formSubmit = async () => {
    try {

      const formData = new FormData();
      for (const property in editPost) {
        formData.append(property, editPost[property])
      }
      formData.append('status', articleStatus)
      formData.append('articleid', router.query.id)
      formData.append('description', description)
      const headers = {
        'Authorization': `Bearer ${token}`,
      }
      const res = await updateArticleById(formData,headers);
      if (res.data.bool) {
        router.push('/auth/articles')
        toast.success('Update article successfully', {
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
  }
  useEffect(() => {
    setToken(getAccessToken())
    dispatch(fetchCategory());
    dispatch(fetchCountry());
    getArticleData()
  }, []);
  return (

    <>

      <div className='buttonWrapper'>


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
            <button className='btn btn-outline-bg me-3' onClick={() => {
              
              setEditPost({
                ...editPost,
                description:description
              })
              setPreview(true)
              
              }}>Preview</button>
            <button className='btn btn-bg px-4' type='button' onClick={() => formSubmit()} >Send for approval</button>
          </>
        }
      </div>
      {
        preview ?
          <Preview values={editPost} />
          :

          <div className='editorWrapper mb-5'>
            <div className='addArticleWrapper mt-5 '>
              <form id='add-article' >
                <div className='row'>
                  <div className='col-md-12 mt-3'>
                    <SelectBox name={'categoryid'} value={editPost ? editPost.categoryid : ''} options={category} label={'Article Category'} onChange={(e) => handleChange(e)} />

                  </div>
                  <div className='col-md-12 mt-3'>
                    <SelectBox name={'countryid'} value={editPost ? editPost.countryid : ''} options={country} label={'Article Country'} onChange={(e) => handleChange(e)} />


                  </div>
                  <div className='col-md-12 mt-2'>
                    <InputField type={'text'} name={'title'} value={editPost ? editPost.title : ''} label={'Title'} onChange={(e) => handleChange(e)} />

                  </div>
                  <div className='col-md-12 mt-3 attachment_load'>
                    <label className="form-label fw-bold">Image</label>
                    <InputFile type={'file'} name={'image'} value={editPost ? editPost.username : ''} onChange={handleImageChange} />

                  </div>
                  <div className='col-md-12 mt-3'>
                  <label className="form-label fw-bold">Video URL</label> 
                    <InputField type={'text'} name={'video'} value={editPost ? editPost.video : ''} label={'Video URL'} onChange={(e) => handleChange(e)} />

                  </div>
                  <div className='col-md-12 mt-3'>
                    <Editor
                      name="description"
                      // onChange={handleChange}
                      setFieldValue={setFieldValue}
                      editData={editData}
                      setDescription={setDescription}
                      value={description} 
                      label="edit"
                      />

                  </div>



                </div>
                <div className='d-flex align-items-center mt-2'>


                </div>

              </form>
            </div>

            <div className='articleStatusWrapper'>
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
                  <input className="form-check-input" onChange={(e) => setArticleStatus(e.target.value)} type="radio" name="articleStatus" id="exampleRadios2" value="private" />
                  <label className="form-check-label" htmlFor="exampleRadios2">
                    Private
                  </label>
                  <br />
                  <small>Only visible to site admins and editors.</small>
                </div>
              </div>


            </div>

          </div>
      }


    </>
  )


}

export default AddArticle


