import React, { useId, useState } from "react";
import { QuestionTypes } from "../MkdJsonQuiz";

let timeout = null;

const ShortLongAnswer = ({ updateQuestions, currentQuestion }) => {
  //   console.log("currentQuestion >>", currentQuestion);
  const inputId = useId();
  const [inputValue, setInputValue] = useState("");

  const getValue = () => {
    return inputValue || currentQuestion?.answer;
  };

  function handleInput(e) {
    const inputValue = e.target.value;
    // setValue(inputValue);
    setInputValue(inputValue);

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      const tempCurrentQuestion = { ...currentQuestion };
      tempCurrentQuestion["answer"] = inputValue;
      updateQuestions(tempCurrentQuestion);
      setInputValue("");
    }, 1000); // 500 milliseconds = half a second
  }

  return (
    <>
      {currentQuestion &&
      [QuestionTypes.short_answer, QuestionTypes.long_answer].includes(
        currentQuestion?.type
      ) ? (
        <div className="relative flex w-full grow items-center md:w-[60%] md:min-w-[60%]">
          {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div> */}
          {currentQuestion?.type === QuestionTypes.short_answer ? (
            <input
              type={"text"}
              id={inputId}
              // disabled={disabled}
              placeholder={"Type your answer here"}
              onChange={(e) => handleInput(e)}
              value={getValue()}
              className="block w-full rounded-lg border border-blue-600  bg-white p-4 pl-3 text-sm text-black placeholder-black focus:border-blue-500 focus:ring-blue-500 dark:text-gray-400 dark:placeholder-gray-400"
            />
          ) : (
            <textarea
              id={inputId}
              rows={5}
              // disabled={disabled}
              placeholder={"Type your answer here"}
              onChange={(e) => handleInput(e)}
              value={getValue()}
              className="block w-full resize-none rounded-lg border border-blue-600  bg-white p-4 pl-3 text-sm text-black placeholder-black focus:border-blue-500 focus:ring-blue-500 dark:text-gray-400 dark:placeholder-gray-400"
            />
          )}
        </div>
      ) : null}
    </>
  );
};

export default ShortLongAnswer;
