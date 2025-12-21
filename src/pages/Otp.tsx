import React, { useState, useRef } from "react";
import "../styles/Otp.css";

const Otp: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length === 6) {
      alert("OTP Verified (dummy)");
    } else {
      alert("Please enter complete OTP");
    }
  };

  return (
    <div className="otp-page">
      <div className="otp-card">
        <div className="otp-icon">✔</div>

        <h2 className="otp-title">Verification Code</h2>
        <p className="otp-text">
          Please enter the 6-digit verification code sent to your number
        </p>

        <form onSubmit={handleSubmit}>
          <div className="otp-input-group">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="otp-box"
              />
            ))}
          </div>

          <button type="submit" className="otp-btn">
            Confirm Code
          </button>

          <button type="button" className="otp-resend">
            Resend
          </button>
        </form>
      </div>
    </div>
  );
};

export default Otp;
