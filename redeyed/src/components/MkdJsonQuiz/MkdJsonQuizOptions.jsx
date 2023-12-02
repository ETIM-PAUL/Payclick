import React from "react";
import MkdJsonQuizOption from "./MkdJsonQuizOption";

const MkdJsonQuizOptions = ({ currentQuestion, updateQuestions }) => {
  return (
    <div className="flex w-full grow flex-col items-center justify-between gap-5">
      {currentQuestion &&
      currentQuestion?.options &&
      currentQuestion?.options?.length
        ? currentQuestion?.options?.map((option, optionkey) => (
            <MkdJsonQuizOption
              className={``}
              key={optionkey}
              option={option}
              currentQuestion={currentQuestion}
              updateQuestions={updateQuestions}
            />
          ))
        : null}
    </div>
  );
};

export default MkdJsonQuizOptions;
