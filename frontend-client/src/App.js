import "./App.css";
import NavBar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Bookingpage from "./pages/Bookingpage";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Homepage />} />
          <Route path="/book/:carid" element={<Bookingpage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
