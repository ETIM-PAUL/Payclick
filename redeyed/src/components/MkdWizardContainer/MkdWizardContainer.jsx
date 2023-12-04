
  import React, { useState } from "react";

  const MkdWizardContainer = ({ children }) => {
    const [activeId, setActiveId] = useState(1);
  
    const childrenArray = React.Children.toArray(children);
  
    const activeIndex = childrenArray.findIndex(
      (child) => child.props.componentId === activeId
    );
  
    const handlePreviousClick = () => {
      const newIndex = activeIndex - 1;
      if (newIndex >= 0) {
        setActiveId(childrenArray[newIndex].props.componentId);
      }
    };
  
    const handleNextClick = () => {
      const newIndex = activeIndex + 1;
      if (newIndex < childrenArray.length) {
        setActiveId(childrenArray[newIndex].props.componentId);
      }
    };
  
    return (
      <div>
        <div className="component-wrapper">
          {childrenArray.map((child) =>
            child.props.componentId === activeId ? child : null
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-700 px-6 py-2"
            onClick={handlePreviousClick}
            disabled={activeIndex === 0}
          >
            Previous
          </button>
          <button
            className="bg-blue-700 px-6 py-2"
            onClick={handleNextClick}
            disabled={activeIndex === childrenArray.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  
  export default MkdWizardContainer;  
  