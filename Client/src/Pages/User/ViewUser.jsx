import React, { useEffect, useState } from "react";
import BasicTable from "../../Components/BasicTable";
import ContentHeader from "../../Components/ContentHeader";
import Card from "@mui/material/Card";
import "../../style.css";
import axios from "axios";

const ViewUser = () => {
  const [data, setData] = useState([]);

  const columnVisibilityModel = {
    _id: false,
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220, hide: true },
    { field: "username", headerName: "Username", width: 150 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "location", headerName: "Location", width: 200 },
    { field: "mobile", headerName: "Mobile", width: 200 },
    {
      field: "time",
      headerName: "Updated At",
      width: 200,
      valueGetter: (params) => {
        let date = new Date(params.row.updatedAt);
        return (
          date.getFullYear() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getDate()
        );
      },
    },
  ];

  useEffect(() => {
    async function getData() {
      let res = await axios.get("http://localhost:1322/api/auth/users");
      let users = res.data;
      setData(users);
    }
    getData();
  }, []);

  return (
    <div className="admin__content">
      <ContentHeader title="Add User" link="/admin/user/add" />
      <div className="content" style={{ paddingBottom: "20px" }}>
        <Card variant="outlined">
          <BasicTable
            columns={columns}
            rows={data}
            checkboxSelection={true}
            columnVisibilityModel={columnVisibilityModel}
          />
        </Card>
      </div>
    </div>
  );
};

export default ViewUser;
