import React from "react";
import {
  MultipleChoice,
  ShortLongAnswer,
  SingleChoice,
  TrueOrFalse,
} from "./AnswerTypes";
import { QuestionTypes } from "./MkdJsonQuiz";

const MkdJsonQuizQuestions = ({
  currentQuestion,
  updateQuestions,
  questionNumber,
  onPrev,
  onNext,
  isDisable,
  isSumitDisabled,
  onSubmit,
  questionLength,
}) => {
  const getTypeInstruction = (type) => {
    switch (type) {
      case QuestionTypes.single_choice:
        return `Select only one option`;
      case QuestionTypes.multiple_choice:
        return `Select one or more option(s)`;
      case QuestionTypes.short_answer:
        return `Provide an answer`;
      case QuestionTypes.long_answer:
        return `Provide a detailed answer`;
      case QuestionTypes.true_or_false:
        return `Select true or false`;
    }
  };

  return (
    <>
      {currentQuestion ? (
        <>
          <div className="mb-5 flex flex-col items-center">
            <div>
              Question {questionNumber + 1} of {questionLength}
            </div>

            <h2 className="text-center">
              {currentQuestion?.value} {questionNumber + 1}?
            </h2>
            {getTypeInstruction(currentQuestion?.type)}
          </div>

          <SingleChoice
            updateQuestions={updateQuestions}
            currentQuestion={currentQuestion}
          />
          <MultipleChoice
            updateQuestions={updateQuestions}
            currentQuestion={currentQuestion}
          />
          <ShortLongAnswer
            updateQuestions={updateQuestions}
            currentQuestion={currentQuestion}
          />
          <TrueOrFalse
            updateQuestions={updateQuestions}
            currentQuestion={currentQuestion}
          />
        </>
      ) : null}

      <div className="mt-5 flex h-[3.125rem] min-h-[3.125rem] w-full min-w-full max-w-full justify-between gap-5 text-white md:w-[60%] md:min-w-[60%]">
        <button
          disabled={questionNumber === 0}
          onClick={() => onPrev()}
          className="h-full min-h-full w-1/3 rounded-md bg-blue-500 shadow-md"
        >
          Prev
        </button>
        <button
          disabled={isDisable()}
          onClick={() => onNext()}
          className={`h-full min-h-full w-1/3 rounded-md bg-blue-500 shadow-md ${
            questionNumber + 1 === questionLength ? "hidden" : "block"
          }`}
        >
          Next
        </button>
        <button
          disabled={isSumitDisabled()}
          onClick={() => onSubmit()}
          className={`h-full min-h-full w-1/3 rounded-md bg-green-600 shadow-md ${
            questionNumber + 1 === questionLength ? "block" : "hidden"
          }`}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default MkdJsonQuizQuestions;
