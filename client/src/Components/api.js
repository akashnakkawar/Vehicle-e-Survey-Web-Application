import axios from 'axios';

const api =axios.create({
     baseURL: 'http://localhost:8080/api', 
})

//user api
export const userLogin = payload => api.post('/userlogin',payload)
export const userSignIn = payload => api.post('/signup',payload)

//admin api

export const insertQuestion = payload => api.post('/insertQuestion',payload)
export const getQuestions =()=>api.get('/getQuestions')
export const deleteQuestion =payload=>api.post('/deleteQuestion',payload)
export const updateQuestion =payload=>api.post('/updateQuestion',payload)
export const updateOptions =payload =>api.post('/updateOptions',payload)
export const userUpdate = payload =>api.post('/userupdate',payload)

//exporting 

const apis = {userSignIn,insertQuestion,getQuestions,deleteQuestion,updateQuestion,updateOptions,userLogin,userUpdate}

export default apis;