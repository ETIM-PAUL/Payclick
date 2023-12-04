
  import React, { useState } from "react";

  const MkdTabContainer = ({
    tabs = ["Tab One", "Tab Two"],
    children,
    className = "",
  }) => {
    const [activeId, setActiveId] = useState(0);
  
    const childrenArray = React.Children.toArray(children);
  
    return (
      <>
        <div
          className={`h-fit min-h-[9.375rem] w-full cursor-pointer rounded-md ${className}`}
        >
          <div className="flex h-full max-h-full min-h-full w-full min-w-full max-w-full flex-col items-center  ">
            <div className="flex h-[50px] w-full justify-center ">
              {tabs?.length
                ? tabs?.map((tab, tabKey) => (
                    <div
                      key={tabKey}
                      onClick={() => setActiveId(tabKey)}
                      className={`flex grow cursor-pointer items-center justify-center  transition-all  ${
                        activeId === tabKey ? "bg-blue-600" : ""
                      }`}
                    >
                      {tab}
                    </div>
                  ))
                : null}
            </div>
  
            {childrenArray.map((child) =>
              child.props.componentId === activeId ? child : null
            )}
          </div>
        </div>
      </>
    );
  };
  
  export default MkdTabContainer;
  
