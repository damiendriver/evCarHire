import React, { useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";

function Registerpage() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirm, setconfirm] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();

  async function register() {
    if (password === confirm) {
      const member = {
        name,
        email,
        password,
        confirm,
      };

      try {
        setloading(true);
        const result = await axios.post("/api/member/register", member);
        setloading(false);
        setsuccess(true);

        // after successful register clear input fields
        setname("");
        setemail("");
        setpassword("");
        setconfirm("");

        console.log(result.data);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
    } else {
      alert("Passwords do not match. Please double check and try again.");
    }
  }

  return (
    <div className="m-5">
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 box">
          {loading && <Loading />}
          {error && <Error />}
          {success && <Success message="Registration Successful" />}
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div>
                <button
                  className="btn btn-primary mt-3 mr-2"
                  onClick={register}
                >
                  Register
                </button>
              </div>
              <div style={{ flexGrow: 1, textAlign: "center" }}>
                Already a Member?
              </div>
              <div>
                <button
                  className="btn btn-primary mt-3 ml-2"
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Registerpage;
