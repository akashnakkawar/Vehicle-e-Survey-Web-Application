import React from 'react'
import {Link} from 'react-router-dom'


export default function Navbar(props) {
      
      return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link class="navbar-brand" to='/'>e-Survey Shangri-La</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
             
              <Link class="nav-link"  to='/'>Home</Link>
              </li>
              <li class="nav-item">
              {!props.isLogin?
              <Link class="nav-link" to='/login'>Login</Link> :
              <Link class="nav-link" to='/' onClick={()=>props.checkLogin(false)}>Logout</Link> 
              }
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
      )
    
    
    
  
}
