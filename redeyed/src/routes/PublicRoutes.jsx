
  import React, { memo } from "react";
  import metadataJSON from "Utils/metadata.json";
  
function PublicRoute({ element, path }) {
  React.useEffect(() => {
    const metadata = metadataJSON[path ?? "/"];
    if (!(metadata == null)) {
      document.title = metadata.title;
    } else {
      document.title = "redeyeddev";
    }
  }, [path]);

  return (
    <>
      {element}
    </>
  );
}

export default memo(PublicRoute);
