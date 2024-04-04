import React from 'react'
import Template from '../components/Template'
import login2 from "../assets/login2.jpg"

const Login = ({setIsLoggedIn}) => {
  return (
    <Template
      title="Welcome Back"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={login2}
      formtype="login"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Login