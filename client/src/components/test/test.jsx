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
  const [userData, setUserData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [nextbtn, setNextBtn] = useState(false);
  const [prevbtn, setPrevBtn] = useState(true);
  const [score, setScore] = useState(0);
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
        }
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        navigate("/");
      }
    }
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
    getUserData();
  }, [test.length]);
  function handleChange(e) {
    const { name, value } = e.target;
    setAnswers((prevnote) => {
      return {
        ...prevnote,
        [name]: value,
      };
    });
    console.log(answers);
  }
  function onsubmit(e) {
    e.preventDefault();
    console.log(answers);
    for (var i = 0; i < test.Questions.length; i++) {
      var cq = test.Questions[i];
      answers[cq.questionId] === cq.correctAnswer
        ? setScore(score + 4)
        : setScore(score - 1);
    }
  }
  function nextQuestion() {
    setCurrentQuestion(currentQuestion + 1);

    setPrevBtn(false);
    if (currentQuestion === test.Questions.length - 2) {
      setNextBtn(true);
    }
  }
  function prevQuestion() {
    setCurrentQuestion(currentQuestion - 1);
    if (currentQuestion === 1) {
      setPrevBtn(true);
    } else {
      setPrevBtn(false);
      setNextBtn(false);
    }
  }

  return test.TopicName ? (
    <>
      {" "}
      <h1>{score}</h1>
      <Box sx={{ flexGrow: 1 }}>
        <p>{userData.name} </p>
        <p>{test.TopicName} </p>
        <Button
          style={{ position: "absolute", right: "20px", top: "10px" }}
          variant="contained"
          color="success"
          size="small"
          onClick={() => {
            navigate("/");
          }}
        >
          Exit
        </Button>{" "}
        <Button
          variant="contained"
          style={{ position: "absolute", right: "20px", top: "50px" }}
          color="success"
          onClick={onsubmit}
        >
          Submit
        </Button>
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
                  value={test.Questions[currentQuestion].op1}
                  control={<Radio color="success" />}
                  label={test.Questions[currentQuestion].op1}
                />
                <FormControlLabel
                  name={test.Questions[currentQuestion].questionId}
                  onChange={handleChange}
                  value={test.Questions[currentQuestion].op2}
                  control={<Radio color="success" />}
                  label={test.Questions[currentQuestion].op2}
                />
                <FormControlLabel
                  name={test.Questions[currentQuestion].questionId}
                  onChange={handleChange}
                  value={test.Questions[currentQuestion].op3}
                  control={<Radio color="success" />}
                  label={test.Questions[currentQuestion].op3}
                />
                <FormControlLabel
                  name={test.Questions[currentQuestion].questionId}
                  onChange={handleChange}
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
            onClick={prevQuestion}
            disabled={nextbtn}
            variant="contained"
            disabled={prevbtn}
            fullWidth={true}
            color="success"
          >
            {" "}
            Prev
          </Button>
          <Button
            onClick={nextQuestion}
            disabled={nextbtn}
            variant="contained"
            fullWidth={true}
            color="success"
          >
            {" "}
            Next
          </Button>{" "}
        </CardActions>
      </Card>
    </>
  ) : (
    <>
      <center>
        <ReactLoading
          type="spin"
          color="green"
          marginTop={"100px"}
          height={"100px"}
          width={"100px"}
        />
        please wait
      </center>
    </>
  );
}
