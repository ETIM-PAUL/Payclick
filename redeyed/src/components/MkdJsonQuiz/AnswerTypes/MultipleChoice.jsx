import React from "react";
import MkdJsonQuizOptions from "../MkdJsonQuizOptions";
import { QuestionTypes } from "../MkdJsonQuiz";

const MultipleChoice = ({ updateQuestions, currentQuestion }) => {
  //   console.log("currentQuestion >>", currentQuestion);
  return (
    <>
      {currentQuestion &&
      currentQuestion?.type === QuestionTypes.multiple_choice ? (
        <MkdJsonQuizOptions
          updateQuestions={updateQuestions}
          currentQuestion={currentQuestion}
        />
      ) : null}
    </>
  );
};

export default MultipleChoice;
