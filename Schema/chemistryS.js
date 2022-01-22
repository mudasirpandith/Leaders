const mongooose = require("mongoose");

const ChemistrySchema = new mongooose.Schema({
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

const Chemistry = mongooose.model("Chemistry", ChemistrySchema);
module.exports = Chemistry;
