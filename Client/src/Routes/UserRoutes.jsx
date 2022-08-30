import UserLogin from "../Pages/UserLogin";
import UserRegister from "../Pages/UserRegister";
import { Route } from "react-router-dom";
import Home from "../Pages/Home";
import Election from "../Pages/Election";
import Footer from "../Components/User/Footer";
import Navbar from "../Components/User/Navbar";

export const userRoutes = [
  <Route
    path="/"
    element={
      <>
        <Navbar />
        <Home />
        <Footer />
      </>
    }
  />,
  <Route
    path="/election"
    element={
      <>
        <Navbar />
        <Election />
        <Footer />
      </>
    }
  />,
  <Route path="/login" element={<UserLogin />} />,
  <Route path="/register" element={<UserRegister />} />,
];
