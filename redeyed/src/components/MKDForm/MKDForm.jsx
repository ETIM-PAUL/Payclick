
import React from "react";

const MKDForm = ({ onSubmit, children, className }) => {
    return (
        <>
        <form className={`w-full max-w-lg ${className}`} onSubmit={onSubmit}>
        {children}
        </form>
        </>
        );
};

export default MKDForm;
