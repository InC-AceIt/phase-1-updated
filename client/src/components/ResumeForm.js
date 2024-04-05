import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResumeForm = () => {

    const navigate= useNavigate();
    const [resume, setResume] = useState(null);

    const submitResume = async (resume) => {
    const formData = new FormData();
    formData.append('resume', resume);
  
    try {
      const response = await fetch('/profile/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to send resume');
      }
    
      const data = await response.json();
      console.log(data);
      navigate("/profile/interviewprep",{state:{data}});
    } catch (error) {
      console.error(error);
    }
  }




  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitResume(resume);
  };

  return (
    <form className=' w-full h-5/6 'onSubmit={handleSubmit}>
    <div className=' mt-6 w-full h-full flex flex-col gap-y-4 items-center justify-center '>
        <div className=' w-full text-lg font-semibold flex justify-center'>
            Upload Resume
        </div>
        <div>
            <input className='text-lg'type="file" onChange={handleFileChange} />
        </div>
        <div className=''>
            <button className='border rounded-md text-lg p-2 hover:scale-110 transition duration-300' type="submit">Submit</button>
        </div>

    </div>   
    </form>
  );
};

export default ResumeForm;