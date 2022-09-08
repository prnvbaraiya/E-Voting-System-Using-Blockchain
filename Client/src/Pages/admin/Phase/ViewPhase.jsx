import React, { useEffect } from "react";
import axios from "axios";
import { serverLink } from "../../../Data/Variables";
import { useState } from "react";
import BasicTable from "../../../Components/BasicTable";
import ContentHeader from "../../../Components/ContentHeader";
import Card from "@mui/material/Card";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const ViewPhase = () => {
  const [data, setData] = useState("");
  const columns = [
    { field: "_id", headerName: "Id", width: 220, hide: true },
    { field: "name", headerName: "Name", width: 220 },
    { field: "candidates", headerName: "Candidates", width: 220, hide: true },
    { field: "currentPhase", headerName: "Phase", width: 220 },
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
  ];

  useEffect(() => {
    async function getData() {
      let link = serverLink + "/elections";
      let res = await axios.get(link);
      let tmp = res.data;
      console.log(tmp);
      setData(tmp);
    }
    getData();
  }, []);

  return (
    <>
      {data && (
        <div className="admin__content">
          <ContentHeader />
          <div className="content" style={{ paddingBottom: "20px" }}>
            <Card variant="outlined">
              <BasicTable columns={columns} checkboxSelection rows={data} />
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewPhase;
