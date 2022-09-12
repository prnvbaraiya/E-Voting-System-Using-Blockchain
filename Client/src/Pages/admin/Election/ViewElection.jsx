import React, { useEffect, useState } from "react";
import BasicTable from "../../../Components/BasicTable";
import ContentHeader from "../../../Components/ContentHeader";
import Card from "@mui/material/Card";
import "../../../style.css";
import axios from "axios";
import { serverLink } from "../../../Data/Variables";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

const ViewElection = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const columns = [
    { field: "_id", headerName: "Id", width: 220, hide: true },
    { field: "name", headerName: "Name", width: 220 },
    { field: "candidates", headerName: "Candidates", width: 220 },
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

  useEffect(() => {
    async function getData() {
      let res = await axios.get("http://localhost:1322/api/auth/elections");
      let users = res.data;
      setData(users);
    }
    getData();
  }, []);

  return (
    <>
      <div className="admin__content">
        <ContentHeader title="Add Election" link="/admin/election/add" />
        <div className="content" style={{ paddingBottom: "20px" }}>
          <Card variant="outlined">
            <BasicTable columns={columns} rows={data} />
          </Card>
        </div>
      </div>
    </>
  );
};

export default ViewElection;
