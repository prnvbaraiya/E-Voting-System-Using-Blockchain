import React, { useEffect, useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import axios from "axios";
import { TransactionContext } from "../../context/TransactionContext";
import { stringToAv, stringToColor } from "../../Data/Methods";
import { serverLink } from "../../Data/Variables";

const CandidateLayout = (props) => {
  const { connectWallet, sendTransaction } = useContext(TransactionContext);
  const [data, setData] = useState("");

  const handleClick = (id) => {
    // alert("Hello");
    window.location.replace(serverLink + "op");
    // connectWallet();
    // sendTransaction(props.id, id);
  };

  useEffect(() => {
    async function getData() {
      let res = await axios.get(
        "http://localhost:1322/api/auth/candidate/" + props.username
      );
      let user = res.data;
      setData(user);
    }
    connectWallet();
    getData();
    // eslint-disable-next-line
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
            sx={{
              width: "200px",
              height: "200px",
              fontSize: "50px",
              bgcolor: stringToColor(data.firstName + " " + data.lastName),
            }}
          >
            {data !== "" && stringToAv(data.firstName, data.lastName)}
          </Avatar>
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.username}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
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
          <Button size="small" onClick={() => handleClick(data._id)}>
            Vote
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default CandidateLayout;
