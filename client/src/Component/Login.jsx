import React from "react";
import { useState } from "react";

import {Link} from 'react-router-dom'
import axios from 'axios';
function Login() {


  const [eMail, setEmail] = useState("");
  const [password, setPassord] = useState("");
  const [error, setError] = useState('');
  const HandleSubmit = async(e) => {
    e.preventDefault();
    try {
      const api = await axios.post("http://localhost:8010/login", { eMail, password });
      try {
        if (api.status===200) {
          console.log("Login success");
          setEmail('');
          setPassord('');

        } 
      } catch (error) {
        console.log(error.response);
      }
      
    } catch (error) {
      if (error.response)
      {
        if (error.response.status === 401)
        {
          setError(error.response.data.message);
          return alert(error.response.data.message);

        }
        
        if (error.response.status === 404)
        {
          setError(error.response.data.message);
          return console.log(error.response.data.message);
        }
        
        if (error.response.status === 500)
        {
          alert(error.response.data.message);
          return console.log(error.response.data.message);
          }
        }
    }
    console.log(eMail,password);
  }
  return (
    <div className="container">
      <h2 className="heading">Login</h2>
      <div className="main">
        <form action="" onSubmit={HandleSubmit}>
          <input type="email" value={eMail} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required className="email" />
          <input
            value={password}
            onChange={(e)=>setPassord(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="password"
          />
          <button>Login</button>
          <p className="navSignup"><Link to='/signup'>signup</Link></p>
          {error && (
            <p>{ error}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
