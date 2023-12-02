import React, { useId, useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

const MultipleAnswer = () => {
  const inputId = useId();
  const [inputValue, setInputValue] = useState([]);
  const [currentValue, setCurrentValue] = useState("");

  function handleInput(e) {
    const inputValue = e.target.value;
    setCurrentValue(inputValue);
  }

  const handleValueInput = () => {
    setInputValue((prev) => [currentValue, ...prev]);
    setCurrentValue("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleValueInput();
    }
  };

  return (
    <>
      <div className="relative flex w-full grow items-center md:w-[60%] md:min-w-[60%]">
        <div className="flex w-full flex-col gap-4">
          <div className=" flex w-full items-center justify-between">
            <input
              type={"text"}
              id={inputId}
              // disabled={disabled}
              placeholder={"Type your answer here"}
              onChange={(e) => handleInput(e)}
              onKeyDown={(e) => handleKeyDown(e)}
              value={currentValue}
              className="block w-full rounded-lg border border-blue-600  bg-white p-4 pl-3 text-sm text-black placeholder-black focus:border-blue-500 focus:ring-blue-500 dark:text-gray-400 dark:placeholder-gray-400"
            />
            <span
              role="button"
              className="ml-2 px-2 text-blue-500"
              onClick={handleValueInput}
            >
              <PlusIcon
                className={"h-4 w-8 text-2xl font-bold text-blue-600"}
              />
            </span>
          </div>
          {inputValue?.length > 0 &&
            inputValue.map((input) => {
              return (
                <div key={input} className="flex gap-1 text-sm">
                  <span>{input}</span>
                  <span
                    role="button"
                    className=""
                    onClick={() =>
                      setInputValue((prev) => prev.filter((p) => p != input))
                    }
                  >
                    <TrashIcon
                      className={"h-4 w-8 text-2xl font-bold text-red-600"}
                    />
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default MultipleAnswer;
