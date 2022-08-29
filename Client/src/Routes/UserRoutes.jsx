import UserLogin from "../Pages/UserLogin";
import UserRegister from "../Pages/UserRegister";
import { Route } from "react-router-dom";
import Home from "../Pages/Home";

export const userRoutes = [
  <Route path="/" element={<Home />} />,
  <Route path="/login" element={<UserLogin />} />,
  <Route path="/register" element={<UserRegister />} />,
];
