import React, { useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";
import BACKEND_URL from "../utils/BaseUrl";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleForgotPassword() {
    const member = {
      email,
    };

    try {
      setLoading(true);
      const result = await axios.post(`${BACKEND_URL}/api/member/forgot-password`, member);
      setLoading(false);

      // Assuming result.data contains the necessary response data
      console.log(result.data);
      setSuccess("Password reset email sent successfully!");

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 box">
          {loading && <Loading />}
          {error && <Error message="Error sending password reset email" />}
          {success && (
            <div className="alert alert-success" role="alert">
              {success}
            </div>
          )}

          <h1 style={{ textAlign: "center" }}>Forgot Password</h1>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <button
              className="btn btn-primary mt-3 mr-2"
              onClick={handleForgotPassword}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
