import React from "react";
import CircularProgressBar from "./CircularProgressBar";

const MkdJsonQuizResult = ({ totalScore, onContinue }) => {
  return (
    <div className={`flex w-full grow flex-col items-center justify-between`}>
      <h2 className="mb-5">Your Scored</h2>
      <CircularProgressBar percentage={totalScore} />

      <div className="mt-5 flex h-[3.125rem] min-h-[3.125rem] w-full min-w-full max-w-full justify-center gap-5 border-2 border-transparent text-white md:w-[60%] md:min-w-[60%]">
        <button
          //   disabled={isSumitDisabled()}
          onClick={() => onContinue()}
          className={`h-full min-h-full w-fit rounded-md bg-green-600 px-5 shadow-md`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default MkdJsonQuizResult;
