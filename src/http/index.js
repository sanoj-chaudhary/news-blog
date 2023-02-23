import axios from "axios";

const api = axios.create({
  baseURL:`${process.env.API_URL}`,
  headers:{
    // 'Content-Type':'application/json',
    'Cache-Control': 'max-age=3600, stale-while-revalidate=59,public'
  },
})


export const menuCategory = async ()=>api.get(`/category/all/${process.env.SECRETKEY}`);

export const menuCountry  = async ()=>api.get(`/country/all/${process.env.SECRETKEY}`);

export const addBanners   = async ()=>api.get(`/ads/show/${process.env.SECRETKEY}`);

export const allContent = async ()=>api.get(`/acontent/all/${process.env.SECRETKEY}`);

export const login = async (data)=>api.post(`/login/${process.env.SECRETKEY}`,data);

export const userRegister = async (data)=>api.post(`/signup/${process.env.SECRETKEY}`,data);

export const multipleVideo = async (data)=>api.post(`/video/multiple/${process.env.SECRETKEY}`,data);

export const singleVideoById = async (data)=>api.post(`/video/single/${process.env.SECRETKEY}`,data);

export const AllOpinion = async (data)=>api.post(`/opinion/multiple/${process.env.SECRETKEY}`,data);

export const singleOpinion = async (data)=>api.post(`/opinion/single/${process.env.SECRETKEY}`,data);

export const allImage = async (data)=>api.post(`/image/multiple/${process.env.SECRETKEY}`,data);

export const singleImage = async (data)=>api.post(`/image/single/${process.env.SECRETKEY}`,data);

export const allPodcast = async (data)=>api.post(`/podcast/multiple/${process.env.SECRETKEY}`,data);

export const singlePodcast = async (data)=>api.post(`/podcast/single/${process.env.SECRETKEY}`,data);

export const allNews = async (data)=>api.post(`/news/multiple/${process.env.SECRETKEY}`,data);

export const singleNews = async (data)=>api.post(`/news/single/${process.env.SECRETKEY}`,data);

export const allMustSee = async (data)=>api.post(`/article/mustsee/multiple/${process.env.SECRETKEY}`,data);

export const allStory = async (data)=>api.post(`/article/story/multiple/${process.env.SECRETKEY}`,data);

export const allFeatured = async (data)=>api.post(`/article/featured/multiple/${process.env.SECRETKEY}`,data);







export const readerAddFacArticle = async (data)=>api.post(`/reader/favarticle/add/${process.env.SECRETKEY}`,data);



export const getCommentById = async (data)=>api.post(`/comment/show/${process.env.SECRETKEY}`,data);

// Author
export const getSingleArticleById = async (data)=>api.post(`/article/single/${process.env.SECRETKEY}`,data);










