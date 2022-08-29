import React from "react";
import Sidebar from "../Components/Sidebar";
import ViewUser from "../Pages/admin/User/ViewUser.jsx";
import AddUser from "../Pages/admin/User/AddUser";
import { Route } from "react-router-dom";
import ViewElection from "../Pages/admin/Election/ViewElection";
import AddElection from "../Pages/admin/Election/AddElection";
import ViewCandidate from "../Pages/admin/Candidate/ViewCandidate";
import AddCandidate from "../Pages/admin/Candidate/AddCandidate";
import ViewDashboard from "../Pages/admin/Dashboard/ViewDashboard";
import AdminLogin from "../Pages/admin/AdminLogin";
import AdminLogout from "../Pages/admin/Logout/AdminLogout";

export const adminRoutes = [
  <Route path="/admin" exact element={<AdminLogin />} key="adminLogin" />,
  <Route path="/admin" element={<Sidebar />} key="adminData">
    <Route
      path="dashboard"
      element={<ViewDashboard />}
      key="adminDashboard"
    ></Route>
    <Route path="user">
      <Route index element={<ViewUser />} />
      <Route path="add" element={<AddUser />} />
    </Route>
    <Route path="candidate">
      <Route index element={<ViewCandidate />} />
      <Route path="add" element={<AddCandidate />} />
    </Route>
    <Route path="election">
      <Route index element={<ViewElection />} />
      <Route path="add" element={<AddElection />} />
    </Route>
    <Route path="phase"></Route>
    <Route path="logout" element={<AdminLogout />}></Route>
  </Route>,
];
