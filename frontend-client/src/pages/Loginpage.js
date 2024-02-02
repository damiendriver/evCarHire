import React, { useState } from "react";
import axios from "axios";

function Loginpage() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  async function Login() {
    const member = {
      email,
      password,
    }

    try {
      const result = await axios.post("/api/member/login", member);
      console.log(result.data);
    } catch (error) {
      console.log(error)
    }


    console.log(member)
  }

  return (
    <div className="m-5">
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 box">
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

            <button className="btn btn-primary mt-3 " onClick={Login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Loginpage;
