import React from "react";
import { useState } from "react";

import {Link} from 'react-router-dom'
import axios from 'axios';
function Login() {
  //initializing variables
  const [eMail, setEmail] = useState("");
  const [password, setPassord] = useState("");
  const [error, setError] = useState("");
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      //sending user details to the backend and verify the user
      const api = await axios.post("http://localhost:8010/login", {
        eMail,
        password,
      });
      //reponse from backend
      try {
        //success
        if (api.status === 200) {
          setEmail("");
          setPassord("");
        }
      } catch (error) {
        console.log(error.response);
      }
    } catch (error) {
      //hadling errors and error reponses
      if (error.response) {
        //Incorrect password
        if (error.response.status === 401) {
          setError(error.response.data.message);
          return alert(error.response.data.message);
        }
        //No user found
        if (error.response.status === 404) {
          setError(error.response.data.message);
          return;
        }
        //internal server error
        if (error.response.status === 500) {
          alert(error.response.data.message);
        }
      }
    }
  };
  return (
    <div className="container">
      <h2 className="heading">Login</h2>
      <div className="main">
        <form action="" onSubmit={HandleSubmit}>
          <input
            type="email"
            value={eMail}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="email"
          />{" "}
          <br />
          <input
            value={password}
            onChange={(e) => setPassord(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="password"
          />{" "}
          <br />
          <button>Login</button>
          {error && <p>{error}</p>}
          <p className="navSignup">
            <Link to="/signup">signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
