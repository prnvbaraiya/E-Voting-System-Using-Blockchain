import React, { useEffect, useState } from "react";
import BasicTable from "../../Components/BasicTable";
import Card from "@mui/material/Card";
import "../../style.css";
import axios from "axios";
import ContentHeader from "../../Components/ContentHeader";

const ViewCandidate = () => {
  const [data, setData] = useState([]);

  const dateConverter = (date) => {
    date = new Date(date);
    return (
      date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
    );
  };

  const columnVisibilityModel = {
    _id: false,
    qualification: false,
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    { field: "username", headerName: "Username", width: 150 },
    {
      field: "fname",
      headerName: "Full Name",
      valueGetter: (data) => {
        return data.row.firstName + " " + data.row.lastName;
      },
      width: 300,
    },
    { field: "location", headerName: "Location", width: 200 },
    {
      field: "dob",
      headerName: "Date of Birth",
      valueGetter: (params) => dateConverter(params.row.dob),
      width: 200,
      hide: true,
    },
    {
      field: "qualification",
      headerName: "Qualification",
      width: 200,
    },
    {
      field: "time",
      headerName: "Updated At",
      width: 200,
      valueGetter: (params) => dateConverter(params.row.updatedAt),
    },
  ];

  useEffect(() => {
    async function getData() {
      let res = await axios.get("http://localhost:1322/api/auth/candidates");
      let users = res.data;
      setData(users);
      console.log(users);
    }
    getData();
  }, []);

  return (
    <div className="admin__content">
      <ContentHeader title="Add Candidate" link="/admin/candidate/add" />
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

export default ViewCandidate;
