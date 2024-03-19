import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { id, token } = useParams();

  async function handleResetPassword() {
    const member = {
      password,
    };

    try {
      setLoading(true);
      const result = await axios.post(
        `/api/member/reset-password/${id}/${token}`,
        member
      );
      setLoading(false);

      // Assuming result.data contains the necessary response data
      console.log(result.data);
      setSuccess(true);

      // Redirect successful request to a new page or show a success message
      console.log("Password reset email sent successfully!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.error("Error updating password:", error);
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 box">
          {loading && <Loading />}
          {error && <Error message="Error updating password" />}
          {success && (
            <div className="alert alert-success" role="alert">
              Password updated successfully! Redirecting to login page...
            </div>
          )}

          <h1 style={{ textAlign: "center" }}>Reset Password</h1>
          <input
            type="password"
            className="form-control"
            placeholder="Enter New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <button
              className="btn btn-primary mt-3 mr-2"
              onClick={handleResetPassword}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
