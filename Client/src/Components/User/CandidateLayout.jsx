import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import axios from "axios";

const CandidateLayout = (props) => {
  const index = props.index;
  const link = "" + index;
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      let res = await axios.get(
        "http://localhost:1322/api/auth/candidate/" + props.username
      );
      let user = res.data;
      console.log(user);
      setData(user);
    }
    getData();
  }, [props.username]);

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          height="140"
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "285px",
            alignItems: "center",
          }}
        >
          {" "}
          <Avatar
            aria-label="recipe"
            sx={{ width: "200px", height: "200px", fontSize: "50px" }}
          >
            P
          </Avatar>
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data !== null && (
              <>
                <Typography>
                  Name : {data.firstName + " " + data.lastName}
                </Typography>
                <Typography>Location: {data.location}</Typography>
              </>
            )}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={link}>
            <Button size="small">Vote</Button>
          </Link>
        </CardActions>
      </Card>
    </>
  );
};

export default CandidateLayout;
