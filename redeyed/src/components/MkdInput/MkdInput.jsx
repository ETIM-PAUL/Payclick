
  import React from "react";
import { StringCaser } from "Utils/utils";

const MkdInput = ({
  type = "text",
  page,
  cols = "30",
  rows = "50",
  name,
  label,
  errors,
  register,
  className,
  placeholder,
  options = [],
  mapping = null,
  disabled = false,
}) => {
  return (
    <>
      <div
        className={`mb-4 ${page === "list" ? "w-full pl-2 pr-2 md:w-1/2" : ""}`}
      >
        <label
          className="mb-2 block cursor-pointer text-sm font-bold text-gray-700"
          htmlFor={name}
        >
          {StringCaser(label, { casetype: "capitalize", separator: "space" })}
        </label>
        {type === "textarea" ? (
          <textarea
            className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${className} ${
              errors[name]?.message ? "border-red-500" : ""
            }`}
            disabled={disabled}
            id={name}
            cols={cols}
            name={name}
            placeholder={placeHolder}
            rows={rows}
            {...register(name)}
          ></textarea>
        ) : type === "radio" || type === "checkbox" || type === "color" ? (
          <input
            disabled={disabled}
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            {...register(name)}
            className={`focus:shadow-outline cursor-pointer appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${className} ${
              errors[name]?.message ? "border-red-500" : ""
            } ${type === "color" ? "min-h-[3.125rem] min-w-[6.25rem]" : ""}`}
          />
        ) : type === "dropdown" || type === "select" ? (
          <select
            type={type}
            id={name}
            disabled={disabled}
            placeholder={placeholder}
            {...register(name)}
            className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${className} ${
              errors[name]?.message ? "border-red-500" : ""
            }`}
          >
            <option></option>
            {options.map((option, key) => (
              <option value={option} key={key + 1}>
                {option}
              </option>
            ))}
          </select>
        ) : type === "mapping" ? (
          <>
            {mapping ? (
              <select
                type={type}
                id={name}
                disabled={disabled}
                placeholder={placeholder}
                {...register(name)}
                className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${className} ${
                  errors[name]?.message ? "border-red-500" : ""
                }`}
              >
                <option></option>
                {options.map((option, key) => (
                  <option value={option} key={key + 1}>
                    {mapping[option]}
                  </option>
                ))}
              </select>
            ) : (
              `Please Pass the mapping e.g {key:value}`
            )}
          </>
        ) : (
          <input
            type={type}
            id={name}
            disabled={disabled}
            placeholder={placeholder}
            {...register(name)}
            className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${className} ${
              errors[name]?.message ? "border-red-500" : ""
            }`}
          />
        )}
        <p className="text-field-error italic text-red-500">
          {errors[name]?.message}
        </p>
      </div>
    </>
  );
};

export default MkdInput;
     
      