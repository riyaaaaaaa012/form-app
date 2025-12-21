import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./Otp.css";

const Otp2: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Dummy OTP validation
    if (otp.length === 6) {
      navigate("/form"); // or any page you want next
    } else {
      setError("Please enter a valid 6-digit OTP");
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-card">
        <h2 className="otp-title">OTP Verification</h2>
        <p className="otp-subtitle">
          Enter the 6-digit OTP sent to your mobile number
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="otp-input"
            placeholder="Enter OTP"
          />

          {error && <p className="otp-error">{error}</p>}

          <button type="submit" className="otp-button">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Otp2;
