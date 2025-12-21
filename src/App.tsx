import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Form from "./pages/From";
import Otp from "./pages/Otp";
import Otp2 from "./pages/Otp2";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import OldForm from "./pages/old_form";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/otp2" element={<Otp2 />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/form" element={<Form />} />
        <Route path="/old_form" element={<OldForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
