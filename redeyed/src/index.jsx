
  import React from "react";
  import ReactDOM from "react-dom/client";
  import "./output.css";
  import "./index.css";
  import "slick-carousel/slick/slick.css";
  import "slick-carousel/slick/slick-theme.css";
  import App from "./App";
  
  import { library } from "@fortawesome/fontawesome-svg-core";
  import { fas } from "@fortawesome/free-solid-svg-icons";
  import { far } from "@fortawesome/free-regular-svg-icons";
  import { fab } from "@fortawesome/free-brands-svg-icons";
  
  library.add(fas, far, fab);
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  
  root.render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
  );
  

  