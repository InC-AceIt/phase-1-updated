import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom"

const Services = () => {
  return (
    <div className=" w-full h-full flex gap-x-10 justify-center items-center">

    <div className=" text-xl  border-green-500 border rounded-xl p-4 cursor-pointer shadow-xl hover:scale-110 transition duration-300">
    <Link to="/questsug">Suggest questions</Link>

    </div>
    <div className=" text-xl border-green-500 border rounded-xl p-4 cursor-pointer shadow-xl hover:scale-110 transition duration-300 ">
    <Link to="/resume">Interview Preparation</Link>
    </div>
    <div className=" text-xl border-green-500 border rounded-xl p-4 cursor-pointer shadow-xl hover:scale-110 transition duration-300">
    <Link to="/analyzeprof">Analyze your profile</Link>
    </div>
    
    </div>
  )
}

export default Services