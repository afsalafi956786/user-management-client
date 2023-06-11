import React from 'react'
import Navbar from '../components/Navbar'
import Registration from '../components/Registration'

function Register() {
  return (
    <div>
        <Navbar/>
        <Registration api={'/register'}/>
    </div>
  )
}

export default Register