import React from "react";
import { QuestionTypes } from "./MkdJsonQuiz";

const MkdJsonQuizOption = ({
  option,
  className,
  currentQuestion,
  updateQuestions,
}) => {
  const singleChoiceUpdate = (id) => {
    const tempCurrentQuestion = { ...currentQuestion }; // Avoid deep cloning if possible
    // Check if the current answer has the same ID as the one being toggled
    if (tempCurrentQuestion?.answer?.id === id) {
      tempCurrentQuestion["answer"] = null; // Clear the answer
      updateQuestions(tempCurrentQuestion);
      return; // Exit the function to avoid further processing
    }

    // Find the index of the selected option based on the provided ID
    const optionIndex = tempCurrentQuestion?.options?.findIndex(
      (option) => option?.id === id
    );

    if (optionIndex !== -1) {
      tempCurrentQuestion["answer"] = tempCurrentQuestion?.options[optionIndex];
      updateQuestions(tempCurrentQuestion);
    }
  };

  const multipleChoiceUpdate = (id) => {
    // console.log("id", id);
    const tempCurrentQuestion = { ...currentQuestion }; // Avoid deep cloning if possible
    // Check if the current answer has the same ID as the one being toggled
    if (tempCurrentQuestion?.answers && tempCurrentQuestion?.answers?.length) {
      const answerIndex = tempCurrentQuestion?.answers?.findIndex(
        (answer) => answer?.id === id
      );
      if (answerIndex !== -1) {
        tempCurrentQuestion.answers.splice(answerIndex, 1);
      } else {
        // Find the index of the selected option based on the provided ID
        const optionIndex = tempCurrentQuestion?.options?.findIndex(
          (option) => option?.id === id
        );

        if (optionIndex !== -1) {
          tempCurrentQuestion?.answers?.push(
            tempCurrentQuestion?.options[optionIndex]
          );
        }
      }
    } else {
      tempCurrentQuestion["answers"] = [];
      // Find the index of the selected option based on the provided ID
      const optionIndex = tempCurrentQuestion?.options?.findIndex(
        (option) => option?.id === id
      );

      if (optionIndex !== -1) {
        tempCurrentQuestion?.answers?.push(
          tempCurrentQuestion?.options[optionIndex]
        );
      }
    }
    updateQuestions(tempCurrentQuestion);
  };
  const isSelected = (id) => {
    if (currentQuestion["answers"] && currentQuestion["answers"]?.length) {
      return !!currentQuestion["answers"]?.find((answer) => answer?.id === id);
    } else {
      return false;
    }
  };

  const toggleSelection = (id, type) => {
    switch (type) {
      case QuestionTypes.single_choice:
        singleChoiceUpdate(id);
        break;
      case QuestionTypes.multiple_choice:
        multipleChoiceUpdate(id);
        break;
    }
  };

  return (
    <>
      {currentQuestion &&
      currentQuestion?.type === QuestionTypes.single_choice ? (
        <div
          onClick={() => toggleSelection(option?.id, currentQuestion?.type)}
          className={`flex max-h-[3.125rem] min-h-[3.125rem] w-full min-w-full cursor-pointer items-center rounded-md pl-5 font-medium shadow-md md:w-[60%] md:min-w-[60%] ${className} ${
            currentQuestion["answer"]?.id === option?.id ? "bg-blue-500" : ""
          }`}
        >
          {option?.value}
        </div>
      ) : null}

      {currentQuestion &&
      currentQuestion?.type === QuestionTypes.multiple_choice ? (
        <div
          onClick={() => toggleSelection(option?.id, currentQuestion?.type)}
          className={`flex max-h-[3.125rem] min-h-[3.125rem] w-full min-w-full cursor-pointer items-center rounded-md pl-5 font-medium shadow-md md:w-[60%] md:min-w-[60%] ${className} ${
            isSelected(option?.id) ? "bg-blue-500" : ""
          }`}
        >
          {option?.value}
        </div>
      ) : null}
    </>
  );
};

export default MkdJsonQuizOption;
