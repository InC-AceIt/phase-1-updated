import React from "react";
import OTPForm from "../components/OTPForm";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginOTPScreen = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOTPConfirm = async (otp) => {
    setIsLoading(true);
    setError(null);

    fetch("/verify/otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(otp),
    })
      .then((response) => {
        return response.json(); // Add a return statement here
      })
      .then((data) => {
        if (data.ok) {
          console.log(data);
          setIsLoggedIn(true);    // If signup is successful, redirect to OTP verification page
          navigate("/dashboard");
        } else {
          // If there's an error, show error message
          navigate("/user/signup");
          toast.error(data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error
      });

    // try {
    //   // Send the OTP to your backend using fetch API
    //   const response = await fetch("/user/verify/otp", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify( otp ),
    //   });

    //   // if (!response.ok) {
    //   //   alert("OTP verification failed");
    //   //   navigate("/user/signup");
    //   // }

    //   // // Handle success and navigate to another page or perform any desired action
    //   // alert("OTP verified successfully!");
    //   // console.log("otp verified");
    //   // setIsLoggedIn(true);
    //   // navigate("/dashboard");
    // } catch (err) {
    //   setError(err.message);
    // } finally {
    //   setIsLoading(false);
    // }
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
export default LoginOTPScreen;
