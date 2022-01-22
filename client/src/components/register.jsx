import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Register() {
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({});

  const [submitText, setSubbmitText] = useState("Register");
  const navigate = useNavigate();

  function updateForm(value) {
    return setUserData((prev) => {
      return { ...prev, ...value };
    });
  }
  const newPerson = { ...userData };
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...userData };

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    });
    const data = await res.json();
    if (res.status === 400) {
      setMessage(data.message);
      setSubbmitText("Register");
    } else {
      setMessage("");
      navigate("/login");
    }
    console.log(data);
  }
  function handleSubmitText() {
    setSubbmitText("Pease Wait ...");
  }
  return (
    <>
      {" "}
      <center className="box">
        <div className="register-box">
          <h1 className="leaders">LEADERS</h1>
          <p className="leaders-des">An initiative to lead students</p>
          <p className="note">
            {" "}
            <strong>LEADERS</strong> is an initiative to serve students of Jammu
            And Kashmir.We provide online practise test for different subjects.
            Besides we provides notes for different subjects.Our main motive is
            to provide those facilities to students of J&K which they are
            lagging in.
          </p>
          <p className="message">{message}</p>
          <h2>Create Account </h2>
          <Box
            onSubmit={onSubmit}
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "35ch" },
            }}
            noValidate
            autoComplete="off"
          >
            {" "}
            <TextField
              id="outlined-basic"
              type="text"
              name="name"
              id="name"
              onChange={(e) => updateForm({ name: e.target.value })}
              value={userData.name}
              label="Name"
              variant="outlined"
            />{" "}
            <br />
            <TextField
              id="outlined-basic"
              type="email"
              name="email"
              id="email"
              onChange={(e) => updateForm({ email: e.target.value })}
              value={userData.email}
              label="Email"
              variant="outlined"
            />{" "}
            <br />
            <TextField
              id="outlined-basic"
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              onChange={(e) => updateForm({ phoneNumber: e.target.value })}
              value={userData.phoneNumber}
              label="Phone Number"
              variant="outlined"
            />{" "}
            <br />
            <TextField
              id="outlined-basic"
              type="password"
              name="password"
              id="password"
              onChange={(e) => updateForm({ password: e.target.value })}
              value={userData.value}
              label="Password"
              variant="outlined"
            />{" "}
            <br />{" "}
            <Button
              variant="contained"
              onClick={handleSubmitText}
              type="submit"
            >
              {" "}
              {submitText}
            </Button>
          </Box>{" "}
          <NavLink className="nav-link" to="/login">
            Already Registered?
          </NavLink>
        </div>
      </center>
      <footer>Copyright©{new Date().getFullYear()}|Leaders</footer>
    </>
  );
}
