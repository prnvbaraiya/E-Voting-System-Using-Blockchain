import React, { useEffect, useState } from "react";
import BasicTable from "../../../Components/BasicTable";
import ContentHeader from "../../../Components/ContentHeader";
import Card from "@mui/material/Card";
import "../../../style.css";
import axios from "axios";
import { serverLink } from "../../../Data/Variables";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Alert, Snackbar } from "@mui/material";

const ViewElection = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const columns = [
    { field: "_id", headerName: "Id", width: 220, hide: true },
    { field: "name", headerName: "Name", width: 220 },
    { field: "candidates", headerName: "Candidates", width: 220 },
    {
      field: "delete",
      headerName: "Delete",
      width: 80,
      renderCell: (params) => {
        const deleteBtn = () => {
          const link = serverLink + "election/delete/" + params.row._id;
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
      let res = await axios.get("http://localhost:1322/api/auth/elections");
      let users = res.data;
      setData(users);
    }
    getData();
  }, [open]);

  return (
    <>
      <div className="admin__content">
        <ContentHeader title="Add Election" link="/admin/election/add" />
        <div className="content" style={{ paddingBottom: "20px" }}>
          <Card variant="outlined">
            <BasicTable columns={columns} rows={data} />
          </Card>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Election Deleted
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default ViewElection;
