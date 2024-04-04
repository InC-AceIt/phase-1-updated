import React, { useState } from "react";

const OTPForm = ({ onOTPConfirm }) => {
  const [otp, setOTP] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onOTPConfirm(otp);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="otp">Enter OTP:</label>
      <input
        type="text"
        id="otp"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
      />
      <button type="submit">Confirm OTP</button>
    </form>
  );
};

export default OTPForm;