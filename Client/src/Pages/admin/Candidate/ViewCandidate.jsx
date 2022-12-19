import React, { useEffect, useState } from "react";
import BasicTable from "../../../Components/BasicTable";
import Card from "@mui/material/Card";
import "../../../style.css";
import axios from "axios";
import ContentHeader from "../../../Components/ContentHeader";
import { serverLink } from "../../../Data/Variables";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { Alert, Snackbar } from "@mui/material";

const ViewCandidate = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const dateConverter = (date) => {
    date = new Date(date);
    return (
      date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
    );
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const columnVisibilityModel = {
    _id: false,
    qualification: false,
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220, hide: true },
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
      width: 120,
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
      width: 120,
      valueGetter: (params) => dateConverter(params.row.updatedAt),
      hide: true,
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 80,
      renderCell: (params) => {
        const deleteBtn = () => {
          const link = serverLink + "candidate/delete/" + params.row._id;
          axios.get(link);
          setOpen(true);
        };
        return (
          <Button onClick={deleteBtn}>
            <DeleteIcon sx={{ color: "error.main" }} />
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    async function getData() {
      let res = await axios.get("http://localhost:1322/api/auth/candidates");
      let users = res.data;
      setData(users);
    }
    getData();
  }, [open]);

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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Candidate Deleted
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ViewCandidate;
