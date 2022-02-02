import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { TailSpin } from "react-loader-spinner";

export default function Forget() {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState("");
  const [submitText, setSubbmitText] = useState(false);
  const navigate = useNavigate();

  function updateForm(value) {
    return setUserData((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...userData };

    const res = await fetch("/reset", {
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
    console.log(data.email);
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
            <h3>Password Changed</h3>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Log In</Button>
        </DialogActions>
      </Dialog>{" "}
      <div className="box">
        <center>
          <h1 className="leader">LEADERS</h1>
          <p className="leaders-des">An initiative to lead students</p>
        </center>{" "}
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
                  perferendis.
                </p>
              </div>
            </Grid>
            <Grid item xs={12} md={6} xl={6}>
              <div className="grid">
                <div className="register-box">
                  <h2>Reset Password </h2>
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
                      type="password"
                      name="password"
                      id="password"
                      onChange={(e) => updateForm({ password: e.target.value })}
                      value={userData.value}
                      label=" New Password"
                      variant="outlined"
                    />{" "}
                    <br />
                    <Button
                      variant="contained"
                      onClick={handleSubmitText}
                      type="submit"
                    >
                      {submitText ? (
                        <TailSpin color="#00BFFF" height={25} width={25} />
                      ) : (
                        "RESET PASSWORD"
                      )}
                    </Button>
                  </Box>{" "}
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="nav-link" to="/register">
                    New User?
                  </NavLink>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
        <footer>
          All Rights Reserved ©{new Date().getFullYear()}| Leaders
        </footer>
      </div>{" "}
    </>
  );
}
