const mongooose = require("mongoose");

const PhysicsSchema = new mongooose.Schema({
  TopicName: String,
  TestId: String,
  Questions: [
    {
      questionId: String,
      question: String,
      op1: String,
      op2: String,
      op3: String,
      op4: String,
      correctAnswer: String,
      explaination: String,
    },
  ],
});

const Physics = mongooose.model("Physics", PhysicsSchema);
module.exports = Physics;
