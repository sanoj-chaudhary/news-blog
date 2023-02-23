import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { getAccessToken, getUserProfile } from '../../utils';
import { commentAdd, getCommentById } from '../http/auth-apis';
import { toast } from 'react-toastify';
import Image from 'next/image'
const AddComment = ({ articleid }) => {
  const [user, setUser] = useState()
  const [token, setToken] = useState()
  const [userComment, setUserComment] = useState([]);
  const [inputValue, setInputValue] = useState(
    {
      comment: "", articleid: articleid, token: JSON.parse(getAccessToken())
    }
  );

  const { values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: inputValue,
      validationSchema: '',
      onSubmit: async (values, action) => {
        try {
          const headers = {
            'Authorization': `Bearer ${token}`,
          }
          const res = await commentAdd(values,headers);
          if (res.data.data === "comment added") {
            toast.success('Comment added Successfully', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            action.resetForm()


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
          console.log("Message : ", error.message)
        }
      },
    });

  const getComment = async () => {
    try {
      const rescomm = await getCommentById({ articleid });
      if (rescomm.data.bool) {
        setUserComment(rescomm.data.data);
      }
    } catch (error) {
      console.log("Message : ", error.message)
    }
  }

  useEffect(() => {
    setToken(getAccessToken())
    getComment()
    setUser(JSON.parse(getUserProfile()))
  }, [])

  return (
    <div className="scrn-container comment-container">
      <div className="comment-box">
        <h3 className="comment-title">Add Comments</h3>
        <form onSubmit={handleSubmit} className="comment-form comment-box-wdth">
          <div className="form-group input-textarea">
            <textarea onChange={handleChange} name="comment" value={values.comment} className="form-control" required></textarea>
          </div>
          <div className="input-box">
            <div className="form-group">
              <label>Name :</label>
              <input onChange={handleChange} type="text" value={user && user.name} readOnly />
            </div>
            <div className="form-group">
              <label>Email :</label>
              <input onChange={handleChange} type="text" value={user && user.email} readOnly />
            </div>
          </div>
          <button type="submit" className="btn btn-cmnt">Post Comment</button>
        </form>
      </div>
      {
        userComment.length > 0 && userComment.map((item, key) => (
          <div key={key} className="active-comment-box">
            <div className="comment-box-wdth">
              <div className="comnt-card">
                <div className="circle-cmnt"></div>
                <div className="comment-content">
                  <div className="commnet-titlle">
                    <h4>Bramanto Setyaki</h4>
                    <span>6 hours ago</span>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consect tur adipiscing elit. Nulla sed interdum felis, vel imperdiet elit
                    Lorem ipsum dolor sit amet, consect tur adipiscing elit.
                  </p>
                  <div className="thumb-box">
                    <p><Image height={30} width={30} src="images/thumb.svg" /> <span>10</span></p>
                    <p>Reply</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default AddComment