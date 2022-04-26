const express = require('express')
const router = express.Router()
const user = require('./controllers/user-controller')
const question = require('./controllers/admin-controller')
//user routes..
router.post('/signup',user.UserSignIn)
router.post('/userlogin',user.UserLogin)
router.post('/userupdate',user.UserUpdateQuestion)
//admin routes
router.post('/insertQuestion',question.insertQuestion)
router.get('/getQuestions',question.getQuestions)
router.post('/deleteQuestion',question.deleteQuestion)
router.post('/updateQuestion',question.updateQuestion)
router.post('/updateOptions',question.updateOptions)
router.post('/userlogin',user.UserLogin)
//exporting routes
module.exports=router