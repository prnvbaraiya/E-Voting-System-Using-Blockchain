import React from "react";
import ContentHeader from "../../../Components/ContentHeader";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import DashboardCard from "../../../Components/DashboardCard";

const ViewDashboard = () => {
  const [users, setUsers] = useState(0);
  const [candidates, setCandidates] = useState(0);
  const [elections, setElections] = useState(0);

  useEffect(() => {
    async function getUsers() {
      let res = await axios.get("http://localhost:1322/api/auth/users");
      let users = res.data;
      res = null;
      setUsers(users.length);
      res = await axios.get("http://localhost:1322/api/auth/candidates");
      let candidates = res.data;
      setCandidates(candidates.length);
      res = await axios.get("http://localhost:1322/api/auth/elections");
      let elections = res.data;
      setElections(elections.length);
    }
    getUsers();
  }, []);

  return (
    <div className="admin__content">
      <ContentHeader />
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "15px",
          justifyContent: "space-between",
        }}
      >
        <DashboardCard title="Users" data={users} />
        <DashboardCard title="Candidates" data={candidates} />
        <DashboardCard title="Elections" data={elections} />
      </div>
    </div>
  );
};

export default ViewDashboard;
