import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { TailSpin } from "react-loader-spinner";

export default function Register() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({});

  const [submitText, setSubbmitText] = useState(false);
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
      setSubbmitText(false);
    } else {
      setMessage("");
      setOpen(true);
      setSubbmitText(false);
    }
    console.log(data);
  }
  function handleSubmitText() {
    setSubbmitText(true);
  }
  const handleClose = () => {
    setOpen(false);
    navigate("/login");
  };
  return (
    <>
      {" "}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <center>
            <CheckCircleRoundedIcon sx={{ fontSize: 60 }} color="success" />
          </center>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h3>Registered Successfully</h3>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Log In</Button>
        </DialogActions>
      </Dialog>{" "}
      <div className="box">
        {" "}
        <center>
          <h1 className="leader">LEADERS</h1>
          <p className="leaders-des">An initiative to lead students</p>
        </center>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid xs={12} md={6} xl={6}>
              <div className="motto">
                <p className="note">
                  {" "}
                  <strong className="leaders">LEADERS</strong> is an initiative
                  to serve students of Jammu And Kashmir.We provide online
                  practise test for different subjects. Besides we provides
                  notes for different subjects.Our main motive is to provide
                  those facilities to students of J&K which they are lagging in.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestias sequi, minus eaque repellendus odit numquam fuga!
                  Quod facere corrupti, fugit nesciunt, minima ipsam sed dicta
                  quibusdam iste nihil labore magni. Lorem ipsum dolor, sit amet
                  consectetur adipisicing elit. Corrupti natus quasi quis quos
                  deleniti iure in dolore inventore excepturi dicta! Molestiae
                  ducimus molestias adipisci temporibus cum aliquid, est ut
                  magni? Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Esse natus nulla officiis debitis qui perferendis
                  voluptas omnis libero? Optio explicabo dolor autem accusantium
                  consequatur nihil dignissimos tenetur suscipit architecto
                  perferendis. Lorem ipsum dolor sit amet consectetur est illo
                  shbdhs ssss reiciendis dolorum quibusdam! Eum rerum odio
                </p>
              </div>
            </Grid>
            <Grid div xs={12} md={6} xl={6}>
              <div className="grid">
                <div className="register-box">
                  <h2>Create Account </h2>
                  <p className="message">{message}</p>
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
                      onChange={(e) =>
                        updateForm({ phoneNumber: e.target.value })
                      }
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
                      {submitText ? (
                        <TailSpin color="#00BFFF" height={25} width={25} />
                      ) : (
                        "Register"
                      )}
                    </Button>
                  </Box>{" "}
                  <NavLink className="nav-link" to="/login">
                    Already Registered?
                  </NavLink>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
        <footer>Copyright©{new Date().getFullYear()}|Leaders</footer>
      </div>{" "}
    </>
  );
}
