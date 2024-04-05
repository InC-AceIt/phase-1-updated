import React from 'react'
import OTPForm from '../components/OTPForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginOTPScreen = ({ setIsLoggedIn }) => {
    
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleOTPConfirm = async (otp) => {
      setIsLoading(true);
      setError(null);
  
      try {
        // Send the OTP to your backend using fetch API
        const response = await fetch("/user/verify/otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp }),
        });
  
        if (!response.ok) {
          alert("OTP verification failed");
          navigate("/user/signup");
        }
  
        // Handle success and navigate to another page or perform any desired action
        alert("OTP verified successfully!");
        console.log("otp verified");
        setIsLoggedIn(true);
        navigate("/dashboard");
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className='flex flex-col w-full  h-5/6 gap-y-4 justify-center items-center'>
        <h1 className='  text-lg font-bold'>OTP Verification</h1>
        {error && <p>{error}</p>}
        <OTPForm onOTPConfirm={handleOTPConfirm} />
        {isLoading && <p>Loading...</p>}
      </div>
    );
  };
  export default LoginOTPScreen;
