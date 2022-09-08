import React, { useEffect, useState } from "react";
import BasicTable from "../../../Components/BasicTable";
import ContentHeader from "../../../Components/ContentHeader";
import Card from "@mui/material/Card";
import "../../../style.css";
import axios from "axios";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { serverLink } from "../../../Data/Variables";
import { Alert, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";

const ViewUser = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const columns = [
    { field: "_id", headerName: "ID", width: 220, hide: true },
    { field: "username", headerName: "Username", width: 150 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "location", headerName: "Location", width: 150 },
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
      hide: true,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      renderCell: (params) => {
        const link = "edit/" + params.row._id;
        return (
          <Link to={link}>
            <Button>
              <EditIcon />
            </Button>
          </Link>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 80,
      renderCell: (params) => {
        const deleteBtn = () => {
          const link = serverLink + "user/delete/" + params.row._id;
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    async function getData() {
      let res = await axios.get(serverLink + "users");
      let users = res.data;
      setData(users);
    }
    getData();
  }, [open]);

  return (
    <div className="admin__content">
      <ContentHeader title="Add User" link="/admin/user/add" />
      <div className="content" style={{ paddingBottom: "20px" }}>
        <Card variant="outlined">
          <BasicTable columns={columns} rows={data} checkboxSelection={true} />
        </Card>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          User Deleted
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ViewUser;
