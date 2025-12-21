import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  const [hasAccount, setHasAccount] = useState<"yes" | "no" | null>(null);
  const [accountNumber, setAccountNumber] = useState("");

  const handleYes = () => {
    navigate("/otp");
  };

  const handleSubmit = () => {
    if (!accountNumber.trim()) {
      alert("Please enter account number");
      return;
    }
    navigate("/otp");
  };

  return (
    <div className="home-wrapper">
      <div className="home-card">
        <h1 className="home-title">RBB Bank Account Verification</h1>

        <p className="home-text">Does an account already exist in RBB Bank?</p>

        <div className="home-button-group">
          <button onClick={handleYes} className="btn-primary">
            Yes
          </button>

          <button onClick={() => setHasAccount("no")} className="btn-secondary">
            No
          </button>
        </div>

        {hasAccount === "no" && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="input-field"
            />

            <button onClick={handleSubmit} className="btn-submit">
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
