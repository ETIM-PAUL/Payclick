
  import React, { useId } from "react";
  import MoonLoader from "react-spinners/MoonLoader";

const override = {
  borderColor: "red",
};

export const Spinner = ({ size = 20, color = "#ffffff" }) => {
  const id = useId();
  return (
    <MoonLoader
    color={color}
      loading={true}
      cssOverride={override}
      size={size}
      // aria-label="Loading Spinner"
      data-testid={id}
    />
    );
};
