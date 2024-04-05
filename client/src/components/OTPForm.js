import React, { useState } from "react";

const OTPForm = ({ onOTPConfirm }) => {
  const [otp, setOTP] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onOTPConfirm(otp);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className=' text-xl'htmlFor="otp">Enter OTP:</label>
      <input
        className=" teext-lg"
        type="text"
        id="otp"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
      />
      <br/>
      <br/>
      <div className="flex justify-center">
      <button className=" border rounded-md p-2 text-lg hover:scale-110 transition duration-300"type="submit">Confirm OTP</button>
      </div>
      
    </form>
  );
};

export default OTPForm;