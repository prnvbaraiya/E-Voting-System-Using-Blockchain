import Sidebar from "./Components/Sidebar";
import ViewUser from "./Pages/User/ViewUser";
import AddUser from "./Pages/User/AddUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewElection from "./Pages/Election/ViewElection";
import AddElection from "./Pages/Election/AddElection";
import PageNotFound from "./Pages/PageNotFound";
import ViewCandidate from "./Pages/Candidate/ViewCandidate";
import AddCandidate from "./Pages/Candidate/AddCandidate";
import ViewDashboard from "./Pages/Dashboard/ViewDashboard";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout/Logout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/admin" exact element={<Login />} />
          <Route path="/admin" element={<Sidebar />}>
            <Route path="dashboard" element={<ViewDashboard />}></Route>
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
            <Route path="logout" element={<Logout />}></Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
