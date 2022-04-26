const Questions = require('../schema/questions')

insertQuestion = async (req,res)=>{
    const body = req.body
    const question = new Questions(body)
       question.save()
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
getQuestions = async (req,res)=>{
    Questions.find({})
             .then(result=>{
                return res.status(201).json({
                    success:true,
                    data:result
                }) 
             })
             .catch(err=>{
                console.log('error happened',err)
                return res.status(400).json({
                    success:false
                })
             })
 }
deleteQuestion = async (req,res) =>{
    Questions.findOneAndRemove({id:req.body.id})
             .then(()=>{
                 return res.status(201).json({success:true})
             })
             .catch(e=> {
                  console.log('error',e)
                  return res.status(400).json({success:false})} )
}
updateQuestion = async(req,res) =>{
   
    Questions.findOneAndUpdate({id:req.body.id},{$set:{question:req.body.q}})
    .then((result)=>{
        return res.status(201).json({success:true})
    })
    .catch(e=> {
        console.log('error',e)
        return res.status(400).json({success:false})} )
}
updateOptions = async(req,res) =>{
   
    Questions.findOneAndUpdate({id:parseInt(req.body.id)},{$set:{options:req.body.options}})
    .then((result)=>{
        console.log(result)
        return res.status(201).json({success:true})
    })
    .catch(e=> {
        console.log('error',e)
        return res.status(400).json({success:false})} )
}
module.exports = {
    insertQuestion,
    getQuestions,
    deleteQuestion,
    updateQuestion,
    updateOptions,
   
}