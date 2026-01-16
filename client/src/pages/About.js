import React from 'react';
import Sliding from '../components/Sliding';

const About = () => {
  return (
    <div className='w-full h-5/6 flex flex-col gap-y-4 items-center text-lg font-medium m-3 '>
      <div className=' w-4/6'>
      Welcome to AceIt, your go-to platform for personalized CP questions, interview questions, and profile analysis. Our team is composed of four college friends - Shreyas, Vathsal, Varadraj, and Viraj - who are passionate about helping you succeed in your career.

At AceIt, we understand that every individual has unique learning needs and goals. That's why we've built a platform that provides personalized questions and resources to help you improve your skills and prepare for interviews.
<br></br>
Our team is a group of dedicated professionals who bring their expertise in computer science, web development, and design to create a platform that is both user-friendly and effective.

So, whether you're a student preparing for a coding interview or a professional looking to improve your skills, AceIt has something to offer you. Join us on this journey to success, and let us help you AceIt!
      
      </div>
      <div>
        <Sliding/>
      </div>
    </div>
  )
}

export default About;