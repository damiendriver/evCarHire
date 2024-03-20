import "./App.css";
import NavBar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import VehiclePage from "./pages/VehiclePage";
import Bookingpage from "./pages/Bookingpage";
import Aboutpage from "./pages/Aboutpage";
import Mappage from "./pages/Mappage";
import Termspage from "./pages/Termspage";
import Locationpage from "./pages/Locationpage";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import Profilepage from "./pages/Profilepage";
import Adminpage from "./pages/Adminpage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <div className="MainContent">
          <Routes>
            <Route path="/home" element={<Homepage />} />
            <Route path="/vehicle" element={<VehiclePage />} />
            <Route path="/" element={<Homepage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route
              path="/book/:carid/:pickupdate/:returndate"
              element={<Bookingpage />}
            />
            <Route path="/about" element={<Aboutpage />} />
            <Route path="/map" element={<Mappage />} />
            <Route path="/terms" element={<Termspage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/location" element={<Locationpage />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/register" element={<Registerpage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/reset-password/:id/:token"
              element={<ResetPasswordPage />}
            />
            <Route path="/profile" element={<Profilepage />} />
            <Route path="/admin" element={<Adminpage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
