import React from "react";
import MkdJsonQuizOptions from "../MkdJsonQuizOptions";
import { QuestionTypes } from "../MkdJsonQuiz";

const SingleChoice = ({ updateQuestions, currentQuestion }) => {
  //   console.log("currentQuestion >>", currentQuestion);
  return (
    <>
      {currentQuestion &&
      currentQuestion?.type === QuestionTypes.single_choice ? (
        <MkdJsonQuizOptions
          updateQuestions={updateQuestions}
          currentQuestion={currentQuestion}
        />
      ) : null}
    </>
  );
};

export default SingleChoice;
