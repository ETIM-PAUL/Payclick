
import React, {useId, useState} from "react";
import { StringCaser } from "Utils/utils";

let timeout = null;

const MkdDebounceInput = ({
  type = "text",
  label,
  className,
  placeholder="Search",
  options = [],
  disabled = false,
  setValue,
  value,
  onReady,
  timer=1000
}) => {

const inputId = useId()
const [inputValue, setInputValue] = useState("");

  function handleInput(e) {
    const inputName = e.target.value;
    setValue(inputName);
    setInputValue(inputName);


    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      // Make the API call here using the `name` state variable
      if (inputName.length) {
        onReady(inputName)
      }
    }, timer); // 500 milliseconds = half a second
  }

  return (
    <>
      <form>
        <label
          className="mb-2 block cursor-pointer text-sm font-bold text-gray-700"
          htmlFor={inputId}
        >
          {StringCaser(label, { casetype: "capitalize", separator: "space" })}
        </label>
        {type === "dropdown" || type === "select" ? (
          <select
            type={type}
            id={inputId}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(e)=> handleInput(e)}
            value={value||inputValue}
            className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${className}`}
            >
            <option></option>
            {options.map((option, key) => (
              <option value={option} key={key + 1}>
                {option}
              </option>
            ))}
          </select>
        ) :  (
          <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
          </div>
          <input
            type={type}
            id={inputId}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(e)=> handleInput(e)}
            value={value||inputValue}
          className="block w-full p-4 pl-10 text-sm  border rounded-lg bg-white dark:text-gray-400 border-blue-600 dark:placeholder-gray-400 placeholder-black text-black focus:ring-blue-500 focus:border-blue-500" />
      </div>
          // <input
          //   type={type}
          //   id={inputId}
          //   disabled={disabled}
          //   placeholder={placeholder}
          //   onChange={(e)=> handleInput(e)}
          //   value={value||inputValue}
          //   className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${className}`}
          // />
        )}
        {/* <p className="text-field-error italic text-red-500">
          {errors[name]?.message}
        </p> */}
      </form>
    </>
  );
};

// <input type="search" id="search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />


export default MkdDebounceInput;
