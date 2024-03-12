import React, { useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";
import {Link} from 'react-router-dom';

function Loginpage() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  async function Login() {
    const member = {
      email,
      password,
    };

    try {
      setloading(true);
      const result = await axios.post("/api/member/login", member);
      setloading(false);

      // redirect successful login to vehicle display
      localStorage.setItem("currentMember", JSON.stringify(result));
      window.location.href = "/vehicle";

      console.log(result.data);
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
    }
  }

  return (
    <div className="">
      <div className="m-5">
        {loading && <Loading />}
        <div className="row justify-content-center mt-5">
          <div className="col-md-5 box">
            {error && <Error message="Invalid Login Details" />}
            <div>
              <h1>Login</h1>
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div>
                  <button className="btn btn-primary mt-3 mr-2" onClick={Login}>
                    Login
                  </button>
                </div>
                <div style={{ flexGrow: 1, textAlign: "center" }}>
                  Don't have a member account yet?
                </div>
                <div>
                  <button
                    className="btn btn-primary mt-3 ml-2"
                    onClick={() => {
                      window.location.href = "/register";
                    }}
                  >
                    Register Here
                  </button>
                </div>
              </div>
            </div>
            <br></br>
                <p>
                  <Link to="/forgot-password"> ForgotPassword</Link>
                </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Loginpage;
