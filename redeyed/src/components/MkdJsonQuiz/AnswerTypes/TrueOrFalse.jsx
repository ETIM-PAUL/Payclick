import React from "react";
import { QuestionTypes } from "../MkdJsonQuiz";

const TrueOrFalse = ({ updateQuestions, currentQuestion }) => {
  function handleClick(value) {
    const tempCurrentQuestion = { ...currentQuestion };
    if (
      tempCurrentQuestion["answer"] &&
      tempCurrentQuestion["answer"] === value
    ) {
      tempCurrentQuestion["answer"] = null;
    } else {
      tempCurrentQuestion["answer"] = value;
    }

    updateQuestions(tempCurrentQuestion);
  }

  return (
    <>
      {currentQuestion &&
      [QuestionTypes.true_or_false].includes(currentQuestion?.type) ? (
        <div className="relative flex w-full grow items-center justify-between gap-5 md:w-[60%] md:min-w-[60%]">
          {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div> */}

          <button
            onClick={() => handleClick("true")}
            className={`block w-1/3 rounded-lg border border-blue-600 p-4 pl-3 text-lg font-medium shadow-md transition-all ${
              currentQuestion["answer"] === "true"
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
          >
            True
          </button>

          <button
            onClick={() => handleClick("false")}
            className={`block w-1/3 rounded-lg border border-blue-600 p-4 pl-3 text-lg font-medium shadow-md transition-all ${
              currentQuestion["answer"] === "false"
                ? "bg-blue-500 text-white"
                : "bg-white "
            }`}
          >
            False
          </button>
        </div>
      ) : null}
    </>
  );
};

export default TrueOrFalse;
