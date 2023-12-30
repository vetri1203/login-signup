import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
function Signup() {
  //initializing variables
  const [eMail, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  // email validation
  const EmailValidate = () => {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (eMail.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  };
 //password validation
  const PasswordValidate = () => {
    const validRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (password.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  };

  const phoneNumberCheck = () => {
    return phoneNumber.length === 10;
  };
  //evaluating user details 
  const Handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (EmailValidate() === true) {
      if (PasswordValidate() === true) {
        if (phoneNumberCheck() === true) {
          if ((firstName, lastName)) {
            try {
              setError();
              setLoading(true);
              //sending user details to backend.
              const api = await axios.post("http://localhost:8010/signup", {
                firstName,
                lastName,
                phoneNumber,
                eMail,
                password,
              });
              //response from backend

              //signup successful.
              if (api.status === 201) {
                setLoading(false);
                alert(api.data.message);
                setEmail("");
                setFirstName("");
                setLastName("");
                setPassword("");
                setPhoneNumber("");
                setError("");
              } else {
                setLoading(false);

                alert(api.data.message);    
              }
            } catch (error) { //hadling errors and error reponses 
              setLoading(false);
              const res = error.response.data.message;

              return setError(res);
            }
          } else {
            setLoading(false);
            setError("Enter all details");
          }
        } else {
          setLoading(false);
          return setError("Enter the correct Phone number");
        }
      } else {
        setLoading(false);
        setError(
          "password must contain atleast 1 uppercase, 1 lowercase,1 special character and 1 number"
        );
      }
    } else {
      setLoading(false);
      return setError("Enter Valid email");
    }
  };
  return (
    <div className="signupContainer">
      <form action="" onSubmit={Handlesubmit}>
        <input
          type="text"
          className="firstname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
        />{" "}
        <br />
        <input
          type="text"
          className="lastname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
        />{" "}
        <br />
        <input
          type="email"
          className="email"
          value={eMail}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />{" "}
        <br />
        <input
          type="number"
          className="phoneNumber"
          value={phoneNumber}
          minLength={10}
          maxLength={10}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          required
        />{" "}
        <br />
        <input
          type="password"
          className="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />{" "}
        <br />
        <button className="signupbtn">Signup</button>
        {error && <p className="error">{error}</p>}
        <p>
          <Link to="/" className="navlogin">
            Login
          </Link>
        </p>
      </form>
      {loading && <h2 className="loading">Loading...</h2>}
    </div>
  );
}

export default Signup;
