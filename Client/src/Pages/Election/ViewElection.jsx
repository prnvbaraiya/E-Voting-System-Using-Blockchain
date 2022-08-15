import React, { useEffect, useState } from "react";
import BasicTable from "../../Components/BasicTable";
import ContentHeader from "../../Components/ContentHeader";
import Card from "@mui/material/Card";
import "../../style.css";
import axios from "axios";

const ViewElection = () => {
  const [data, setData] = useState([]);

  const columnVisibilityModel = {
    _id: false,
  };

  const columns = [
    { field: "_id", headerName: "Id", width: 220 },
    { field: "name", headerName: "Name", width: 220 },
    { field: "candidates", headerName: "Candidates", width: 220 },
  ];

  useEffect(() => {
    async function getData() {
      let res = await axios.get("http://localhost:1322/api/auth/elections");
      let users = res.data;
      setData(users);
      console.log(users);
    }
    getData();
  }, []);

  return (
    <>
      <div className="admin__content">
        <ContentHeader title="Add Election" link="/admin/election/add" />
        <div className="content" style={{ paddingBottom: "20px" }}>
          <Card variant="outlined">
            <BasicTable
              columns={columns}
              rows={data}
              columnVisibilityModel={columnVisibilityModel}
            />
          </Card>
        </div>
      </div>
    </>
  );
};

export default ViewElection;
