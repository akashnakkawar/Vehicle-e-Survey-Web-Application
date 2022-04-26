const User = require('../schema/User')
const Sni = require('../schema/sni')


UserSignIn = async (req,res)=>{
    const body = req.body
    const user = new User(body)

    if(!user){
        return res.status(400).json({
            success: false,
            error: 'please enter all details'
        })
    }
    var isMail = await User.findOne({email:user.email})
    if(isMail){
        return res.status(200).json({
            success: false,
            msg:'email',
            error: 'email id present already'
        })
    }
    var isSNI = ['MM2874Z6','FEQQ6UUG','34GC829B','CB8FBCCM'].includes(user.sni)
    
    if(isSNI === false){
        
        return res.status(200).json({
            success: false,
            msg:'sni',
            error: 'sni number is wrong'
        })
    }
    var isSNIused = await User.findOne({sni:user.sni})
    if(isSNIused){
        return res.status(200).json({
            success: false,
            msg:'usedsni',
            error: 'sni is used already'
        })
    }
     
       user.save()
        .then(()=>{
            return res.status(201).json({
                success:true,
            })
        })
        .catch(error =>{
            console.log(error);
            return res.status(400).json({
                success:false,
                
            })
        })

}

UserLogin = async (req,res)=>{
    User.findOne({email:req.body.email,password:req.body.password})
        .then(result=>{
            return res.status(201).json({
                success:true,
                info:result
            })
        })
        .catch((e)=>{
           
            return res.status(401).json({
                success:false
            })
        })
}

UserUpdateQuestion = async (req,res)=>{
    await User.updateOne({_id:req.body.i},{$push:{questions:req.body.data}})
              .then((result)=>{
                return res.status(201).json({
                    success:true,
                }) 
              })
              .catch(e=>{
                return res.status(400).json({
                    success:false,
                })
            })
                
}

module.exports = {
    UserSignIn,
    UserLogin,
    UserUpdateQuestion,
   
}