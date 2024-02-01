import React, { useState } from "react";

function Loginpage() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  function Login() {
    const user = {
      email,
      password,
    };
    console.log(user);
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
