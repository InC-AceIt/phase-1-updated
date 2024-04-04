import React from 'react'
import OTPForm from '../components/OTPForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginOTPScreen = () => {
    
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleOTPConfirm = async (otp) => {
      setIsLoading(true);
      setError(null);
  
      try {
        // Send the OTP to your backend using fetch API
        const response = await fetch("/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to verify OTP.");
        }
  
        // Handle success and navigate to another page or perform any desired action
        alert("OTP verified successfully!");
        navigate("/dashboard");
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div>
        <h1>OTP Verification</h1>
        {error && <p>{error}</p>}
        <OTPForm onOTPConfirm={handleOTPConfirm} />
        {isLoading && <p>Loading...</p>}
      </div>
    );
  };
  export default LoginOTPScreen;
