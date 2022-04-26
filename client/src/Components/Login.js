import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import apis from './api';
import Session from './Session';

export default function Login(props) {
  const [email,setEmail] = useState(null)
  const [psw,setPsw] = useState(null)
  const [validation,setValidation] = useState(false)
  const history = useHistory();
  const [loginerror, setLoginerror] = useState(false)
  const login =async (e)=>{
    e.preventDefault()
    
    if(email===null|| psw===null ||psw==='' ||email==='')
      {
       
        setValidation(true)
        setTimeout(()=>{setValidation(false)},2000)

      }
    else if(email==='admin@shangrila.gov.un' && psw ==='shangrila@2021$')
     {
      history.push('/councilDashboard') 
      Session.setName('admin') 
      props.checkLogin(true,null)
     }
     else{
      var md5 = require('md5')
      const password = md5(psw)
      const payload ={email,password}
      await apis.userLogin(payload).then(res=>{
        if(res.data.info === null)
        {
            setLoginerror(true)
            // setLoginerror(false,null)
            setTimeout(()=>{setLoginerror(false)},2500)
        }
        else{

          Session.setName(res.data.info.name)
          props.checkLogin(true,res.data.info)
          history.push('/userdashboard')
        }
       
      })
      .catch(e=>console.log(e))
     }      
  }
   
    return (
        <div class="container">
        <div class="row">
         <div className="col-3"></div>
         <div className="col-6 my-5">
        <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>setEmail(e.target.value)} required/>
    
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" onChange={(e)=>setPsw(e.target.value)} required/>
  </div>
  <button type="submit" class="btn btn-primary" onClick={login}>Submit</button>
  <div className="text my-3">
    <p>Don't have account? <Link to='/signup'>Signup</Link></p>
</div>
<div className="loginmsg">
  {validation? <div class="alert alert-danger" role="alert">
               Please fill all the fields in the form
          </div>:<p></p>}
</div>
<div className="loginmsg">
  {loginerror? <div class="alert alert-danger" role="alert">
               Username or password is incorrect
          </div>:<p></p>}
</div>
</form>
</div>

<div className="col-3"></div>
        </div>
      </div>
    )
}
