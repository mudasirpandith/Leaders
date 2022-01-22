import React, { useState, useEffect } from "react";
import BasicCard from "./subjectcard";
import CustomDrawer from "../drawer";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import ReactLoading from "react-loading";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function Biology() {
  const [allTests, setTestData] = useState([]);

  useEffect(() => {
    async function getTestData() {
      try {
        const res = await fetch("/alltests/chemistry");
        const data = await res.json();
        if (!res.status === 200) {
          console.log("eroor ocured");
        }

        setTestData(data);
      } catch (err) {
        console.log(err);
      }
    }

    getTestData();
  }, [allTests.length]);

  return allTests.length ? (
    <>
      <CustomDrawer />
      <h1>#</h1>
      <h1>Chemistry</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {" "}
          {allTests
            .slice()
            .reverse()
            .map((test) => {
              const url = "/test/subjectcode/" + test.TestId;
              return (
                <Grid item xs={12} xl={4}>
                  <Item>
                    <BasicCard topic={test.TopicName} link={url} />
                  </Item>
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
