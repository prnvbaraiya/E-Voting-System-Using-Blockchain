import UserLogin from "../Pages/UserLogin";
import UserRegister from "../Pages/UserRegister";
import { Route } from "react-router-dom";
import Home from "../Pages/Home";
import Election from "../Pages/Election";
import Footer from "../Components/User/Footer";
import Navbar from "../Components/User/Navbar";
import ViewElection from "../Pages/ViewElection";

export const userRoutes = [
  <Route
    path="/"
    key="home"
    element={
      <>
        <Navbar />
        <Home />
        <Footer />
      </>
    }
  />,
  <Route path="/election" key="election">
    <Route
      index
      element={
        <>
          <Navbar />
          <Election />
          <Footer />
        </>
      }
    />
    <Route
      path=":id"
      element={
        <>
          <Navbar />
          <ViewElection />
          <Footer />
        </>
      }
    />
    ,
  </Route>,
  <Route path="/login" key="login" element={<UserLogin />} />,
  <Route path="/register" key="register" element={<UserRegister />} />,
];
