import "./App.css";
import NavBar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Bookingpage from "./pages/Bookingpage";
import Aboutpage from "./pages/Aboutpage";
import Mappage from "./pages/Mappage";
import Termspage from "./pages/Termspage";
import Locationpage from "./pages/Locationpage";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Homepage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/book/:carid" element={<Bookingpage />} />
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/map" element={<Mappage />} />
          <Route path="/terms" element={<Termspage />} />
          <Route path="/location" element={<Locationpage />} />
          <Route path="/Login" element={<Loginpage />} />
          <Route path="/Register" element={<Registerpage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
