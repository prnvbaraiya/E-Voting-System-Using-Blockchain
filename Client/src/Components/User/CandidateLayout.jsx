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

const CandidateLayout = (props) => {
  const { connectWallet, currentAccount, sendTransaction } =
    useContext(TransactionContext);
  const index = props.index;
  const [data, setData] = useState("");

  const handleClick = (id) => {
    connectWallet();
    sendTransaction(props.id, id);
  };

  const stringToColor = (string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  };

  const stringToAv = (fname, lname) => {
    let n = fname[0] + lname[0];
    return n;
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
