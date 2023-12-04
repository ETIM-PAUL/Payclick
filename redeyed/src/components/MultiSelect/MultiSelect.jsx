
  import React, { useCallback } from "react";
  import { memo } from "react";
  import { CheckIcon, PlusIcon } from "@heroicons/react/24/solid";
  
  const MultiSelect = ({ label, options, selected, setSelected }) => {
    const toggleOption = useCallback(
      (option) => {
        let temp = selected && selected.length ? [...selected] : [];
        console.log(temp, selected);
        const index = temp.findIndex((i) => i === option);
        if (index > -1) {
          temp.splice(index, 1);
          setSelected([...temp]);
        } else {
          console.log("option >>", option);
          temp.push(option);
          setSelected([...temp]);
        }
      },
      [selected]
    );
  
    return (
      <div className={`group relative w-full`}>
        <div
          className={`flex items-center justify-between rounded-md border border-[#eeeeee] p-[10px] text-[14px]`}
        >
          <div>{label}</div>
        </div>
  
        <div
          className={`left-0 z-10 flex w-full list-none flex-wrap gap-5 overflow-auto rounded-b-md border border-[#eeeeee] bg-white px-2  py-[5px] text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
        >
          {options.map((option, key) => {
            const isSelected = selected.includes(option);
            return (
              <div
                key={key}
                className={`flex w-fit cursor-pointer items-center justify-between gap-x-[5px] gap-y-0 rounded-full px-[10px] py-[6px] hover:bg-[#7d7dfa] ${
                  isSelected ? "bg-[#e25679]" : "bg-[#3c5ee1]"
                } `}
                onClick={() => toggleOption(option)}
              >
                <span className={`text-white`}>{option}</span>
                {isSelected ? (
                  <CheckIcon className={`h-4 w-6 text-lg font-bold text-white`} />
                ) : (
                  <PlusIcon className={`h-4 w-6 text-lg font-bold text-white`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default memo(MultiSelect);
  
