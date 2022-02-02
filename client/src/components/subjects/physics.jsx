import React, { useState, useEffect } from "react";
import BasicCard from "./subjectcard";
import CustomDrawer from "../drawer";

import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";

import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

export default function Biology() {
  const navigate = useNavigate();
  const [allTests, setTestData] = useState([]);

  useEffect(() => {
    async function getUserData() {
      try {
        const res = await fetch(`/home`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!res.status === 200) {
          window.alert("error in loading test");
          navigate("/");
        }
        const data = await res.json();
      } catch (err) {
        navigate("/");
      }
    }
    async function getTestData() {
      try {
        const res = await fetch("/alltests/physics");
        const data = await res.json();
        if (!res.status === 200) {
          console.log("eroor ocured");
        }

        setTestData(data);
      } catch (err) {
        console.log(err);
      }
    }
    getUserData();
    getTestData();
  }, [allTests.length]);

  return allTests.length ? (
    <>
      <CustomDrawer />
      <h1>#</h1>
      <h1>Physics</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {" "}
          {allTests
            .slice()
            .reverse()
            .map((test) => {
              const url = "/test/subjectcode/" + test.TestId;
              return (
                <Grid div xs={12} xl={4}>
                  <div className="subjectBox">
                    <BasicCard topic={test.TopicName} link={url} />
                  </div>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </>
  ) : (
    <>
      {" "}
      <CustomDrawer />
      <h1>#</h1>
      <center>
        <ReactLoading
          type="spin"
          color="green"
          height={"100px"}
          width={"100px"}
        />
        please wait
      </center>
    </>
  );
}
