import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div class="container">
        <div class="row m-5 p-5">
          <div className="text-center welcome">
            <h2>Welcome to e-Survey Shangri-La application</h2>
            <p className="m-5 p-5">please  <Link to='/login'>Login</Link> to continue</p>
          </div>
        </div>
      </div>
    )
}
