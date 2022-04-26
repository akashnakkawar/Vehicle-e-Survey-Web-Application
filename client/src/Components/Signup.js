import React,{useState} from 'react';
import apis from './api'
import { useHistory } from 'react-router';
export default function Signup() {

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        dob: "",
        address:"",
        psw: "",
        sni: "",
      });
    const history = useHistory()
    const [msg,setMsg] = useState(false)
    const [errMsg,seterrMsg] = useState('')
    const { email, name, dob, address, psw, sni } = formData;
    const [success,setSuccess] = useState(false)
    const update = (e) =>
         setFormData({ ...formData, [e.target.name]: e.target.value });
    const submit = async (e)=>{
         e.preventDefault()
         if(formData.email===''||formData.name===''||formData.dob===''||formData.address===''||formData.psw===''||formData.sni==='')
            {
              setMsg(true)
              seterrMsg('Please fill all fields')
              setTimeout(()=>{
                setMsg(false)
                seterrMsg('')
              },2000)
            }
         else
            {
              var md5 = require('md5')
              const password = md5(psw)
              const payload = { email, name, dob, address, password, sni }
              await apis.userSignIn(payload)
                         .then((res)=>{
                          if(res.status===201){
                            setSuccess(true)
                            setTimeout(()=>{history.push('/login')},2000)
                          }
                          if(res.status===200){
                            setMsg(true)
                            if(res.data.msg==='email')
                                 seterrMsg('email id is already used. Please try with different mail id')
                            if(res.data.msg==='sni')
                                 seterrMsg('SNI is wrong')
                            if(res.data.msg==='usedsni')
                                 seterrMsg('SNI is already used')
                            setTimeout(()=>{
                                  setMsg(false)
                                  seterrMsg('')
                                },2000)
                          }                          
                         })
                         .catch(e=>console.log('error',e))
            }
    }
   if(msg){
     return(
      <div className="container">
        <div className="row my-5">
          <div className="col-2"></div>
          <div className="col-8">
          <div class="alert alert-danger" role="alert">
               {errMsg}
          </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
     )
   } 
   else   
    return (
        <div class="container">
        <div class='row'>
        
        </div>
        <div class="row">
         <div className="col-3"></div>
         <div className="col-6 my-5">
        <form>
        {
          success?
          <div class="alert alert-success m-1" role="alert">
          Successfully signed up.. please login to continue..
        </div>:<p></p>}
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" name='email' value={email} onChange={update} id="exampleInputEmail1" aria-describedby="emailHelp"  required/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="fullname" class="form-label">Full Name</label>
    <input type="text" class="form-control" name='name' value={name} onChange={update} id="fullname" required/>
  </div>
  <div class="mb-3">
    <label for="dob" class="form-label">Date of Birth</label>
    <input type="date" class="form-control" name='dob' value={dob} onChange={update} id="dob" required/>
  </div>
  <div class="mb-3">
    <label for="address" class="form-label">Address</label><br/>
    <input type="text" class="form-control" name='address' value={address} onChange={update} id="address" required/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" value={psw} onChange={update} name='psw' id="exampleInputPassword1" required/>
  </div>
  <div class="mb-3">
    <label for="sni" class="form-label">SNI Number</label><br/>
    <input type="text" class="form-control" name='sni' onChange={update} value={sni} id="sni" required/>
  </div>

  <button  class="btn btn-primary" type='submit' onClick={submit}>Submit</button>
  
 
  
</form>
</div>

<div className="col-3"></div>
        </div>
      </div>
    )
}
