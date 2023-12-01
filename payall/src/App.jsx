import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Signin from "./pages/Signin";
import Activity from "./pages/activity";
import Schedule from "./pages/schedule";
import Orders from "./pages/orders";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App
