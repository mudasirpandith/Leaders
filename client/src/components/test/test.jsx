import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import ReactLoading from "react-loading";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Test() {
  const navigate = useNavigate();
  const { testId } = useParams();
  const [test, setTest] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [postiveScore, setPositiveScore] = useState(0);
  const [negativeScore, setNegativeScore] = useState(0);
  const [explaination, setExplaination] = useState("");
  const [nextbtn, setNextBtn] = useState(true);
  const [submitbtn, setSubmitBtn] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState({});
  const [exitBtn, setExitBtn] = useState(true);
  useEffect(() => {
    async function getTest() {
      const res = await fetch(`/get/test/subjectcode/${testId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.status === 200) {
        window.alert("error in loading test");
      }
      const data = await res.json();
      setTest(data);
    }
    getTest();
  }, [test.length]);
  function handleChange(e) {
    const { name, value } = e.target;
    setAnswers((prevnote) => {
      return {
        ...prevnote,
        [name]: value,
      };
    });
  }
  function onsubmit(e) {
    var ID = test.Questions[currentQuestion].questionId;
    var ex = test.Questions[currentQuestion].explaination;

    const correctAnswer = test.Questions[currentQuestion].correctAnswer;
    setNextBtn(false);
    setSubmitBtn(true);
    setCorrectAnswer(correctAnswer);
    if (currentQuestion === test.Questions.length - 1) {
      setNextBtn(true);
      setExitBtn(false);
    }
    if (answers[ID] === correctAnswer) {
      setPositiveScore(postiveScore + 4);
      setMessage("congratulations🥳🥳🥳. You got it right.");
      setExplaination(ex);
      setMessageColor({ color: "green" });
    } else {
      setNegativeScore(negativeScore - 1);
      setExplaination(ex);
      setMessageColor({ color: "red" });
      setMessage("Ooops! You missed it!!!");
    }
  }
  function nextQuestion() {
    setCurrentQuestion(currentQuestion + 1);

    setExplaination("");
    setCorrectAnswer("");
    setSubmitBtn(false);
    setNextBtn(true);
    setMessage("");

    if (currentQuestion === test.Questions.length - 1) {
      setNextBtn(true);
      setExitBtn(false);
    }
  }

  return test.TopicName ? (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <p> Chapter Name: {test.TopicName} </p>
        <Button
          style={{ position: "absolute", right: "20px", top: "10px" }}
          disabled={exitBtn}
          variant="contained"
          color="success"
          size="small"
          onClick={() => {
            navigate("/");
          }}
        >
          Exit
        </Button>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item>
              {" "}
              <p> Correct Marks : {postiveScore}</p>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              {" "}
              <p>Negative Marks : {negativeScore} </p>
            </Item>
          </Grid>
        </Grid>{" "}
      </Box>{" "}
      <Card style={{ marginTop: "100px" }} sx={{ maxWidth: "100%" }}>
        <CardContent>
          <form method="post">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                <Typography gutterBottom variant="h5" component="div">
                  {" "}
                  {`${test.Questions[currentQuestion].questionId}  
                ${test.Questions[currentQuestion].question} `}
                </Typography>
              </FormLabel>
              <RadioGroup aria-labelledby="demo-radio-buttons-group-label">
                <FormControlLabel
                  name={test.Questions[currentQuestion].questionId}
                  onChange={handleChange}
                  disabled={submitbtn}
                  value={test.Questions[currentQuestion].op1}
                  control={<Radio color="success" />}
                  label={test.Questions[currentQuestion].op1}
                />
                <FormControlLabel
                  name={test.Questions[currentQuestion].questionId}
                  onChange={handleChange}
                  disabled={submitbtn}
                  value={test.Questions[currentQuestion].op2}
                  control={<Radio color="success" />}
                  label={test.Questions[currentQuestion].op2}
                />
                <FormControlLabel
                  name={test.Questions[currentQuestion].questionId}
                  onChange={handleChange}
                  disabled={submitbtn}
                  value={test.Questions[currentQuestion].op3}
                  control={<Radio color="success" />}
                  label={test.Questions[currentQuestion].op3}
                />
                <FormControlLabel
                  name={test.Questions[currentQuestion].questionId}
                  onChange={handleChange}
                  disabled={submitbtn}
                  value={test.Questions[currentQuestion].op4}
                  control={<Radio color="success" />}
                  label={test.Questions[currentQuestion].op4}
                />
              </RadioGroup>
            </FormControl>
          </form>
        </CardContent>
        <CardActions>
          <Button
            onClick={nextQuestion}
            disabled={nextbtn}
            variant="contained"
            fullWidth={true}
            color="success"
          >
            {" "}
            Next
          </Button>
          <Button
            variant="contained"
            color="success"
            fullWidth={true}
            disabled={submitbtn}
            onClick={onsubmit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
      <Card style={{ marginTop: "20px" }}>
        <div style={{ width: "100%" }}>
          <h2 style={messageColor}>{message}</h2>
          <h3>Correct Answer: {correctAnswer} </h3>
          <p>Explaination: {explaination} </p>
        </div>
      </Card>
    </>
  ) : (
    <>
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
