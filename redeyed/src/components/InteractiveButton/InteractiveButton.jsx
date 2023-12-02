
    import React, { memo, useId } from "react";
import MoonLoader from "react-spinners/MoonLoader";

export const InteractiveButton = memo(({ loading = false, disabled, children, type = "button", className, loaderclasses, onClick, color = "#ffffff" }) => {
  const override = {
    // display: "block",
    // margin: "0 auto",
    borderColor: "#ffffff",
  };
  const id = useId();
  return (
    <button type={type} disabled={disabled} className={`flex gap-5 justify-center items-center ${className}`} onClick={onClick}>
      {/* { loading ? */}
      <>
        {/* <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>  */}
        <MoonLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={20}
          className={loaderclasses}
          // aria-label="Loading Spinner"
          data-testid={id}
        />

        <span>{children}</span>
      </>
      {/* : children
      } */}
    </button>
  );
});

