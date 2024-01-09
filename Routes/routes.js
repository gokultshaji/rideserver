const express=require('express')

//router object
const router=new express.Router()
const user=require('../controllers/userControl')
const upload=require('../middlewere/multerMiddlewere')
const {jwtMiddleware}=require('../middlewere/jwtmiddlewere')
//signup

 router.post('/user/register',user.register)

//login

router.post('/user/login',user.login)



module.exports=router