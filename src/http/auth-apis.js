import axios from "axios";

const api = axios.create({
  baseURL:`${process.env.API_URL}`,
 
})

// author
export const authorArticleShow = async (data,headers)=>api.post(`/auth/author/myarticle/show/${process.env.SECRETKEY}`,data,{headers});
export const articleSummary = async (data,headers)=>api.post(`/auth/author/myarticle/summary/${process.env.SECRETKEY}`,data,{headers});
export const changePassword = async (data,headers)=>api.post(`/auth/password/edit/${process.env.SECRETKEY}`,data,{headers});
export const updateProfile = async (data,headers)=>api.post(`/auth/profile/edit/${process.env.SECRETKEY}`,data,{headers});
export const articleCount = async (data,headers)=>api.post(`/auth/article/view/count/${process.env.SECRETKEY}`,data,{headers});
export const addArticleApi = async (data,headers)=>api.post(`/auth/author/myarticle/add/${process.env.SECRETKEY}`,data,{headers});
export const updateArticleById = async (data,headers)=>api.post(`/auth/author/myarticle/edit/${process.env.SECRETKEY}`,data,{headers});

// Editor
export const authorsSummary = async (data,headers)=>api.post(`/auth/editor/all_summary/${process.env.SECRETKEY}`,data,{headers});
export const allAuthorsArticle = async (data,headers)=>api.post(`/auth/editor/article/multiple/${process.env.SECRETKEY}`,data,{headers});
export const getAuthorSummaryByidforEditor = async (data,headers)=>api.post(`/auth/editor/article_author_summary/${process.env.SECRETKEY}`,data,{headers});
export const updateArticleStatusByEditor = async (data,headers)=>api.post(`/auth/editor/article/status/edit/${process.env.SECRETKEY}`,data,{headers});




export const showProfile = async (data)=>api.post(`/auth/profile/show/${process.env.SECRETKEY}`,data,{headers});
export const updateArticle = async (data)=>api.post(`/auth/article/edit/view/${process.env.SECRETKEY}`,data,{headers});

export const newsLetterSubscribe = async (data)=>api.post(`/auth/subscribe/${process.env.SECRETKEY}`,data,{headers});
// Reader
export const readerFacArticle = async (data)=>api.post(`/auth/reader/favarticle/show/${process.env.SECRETKEY}`,data,{headers});

export const commentAdd = async (data,headers)=>api.post(`/comment/add/${process.env.SECRETKEY}`,data,{headers});