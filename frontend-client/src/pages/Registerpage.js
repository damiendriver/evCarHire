import React, { useState } from "react";
import axios from "axios";

function Registerpage() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirm, setconfirm] = useState("");

  async function register() {
    if (password === confirm) {
      const member = {
        name,
        email,
        password,
        confirm,
      }

      try {
        const result = await axios.post("/api/member/register", member);
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Passwords do not match. Please double check and try again.");
    }
  }

  return (
    <div className="m-5">
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 box">
          <div>
            <h1>Register</h1>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
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
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => {
                setconfirm(e.target.value);
              }}
            />
            <button className="btn btn-primary mt-3" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Registerpage;
