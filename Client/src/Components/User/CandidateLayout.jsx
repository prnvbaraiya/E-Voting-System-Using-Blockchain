import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import axios from "axios";

const CandidateLayout = (props) => {
  const { ethereum } = window;
  const index = props.index;
  const link = "" + index;
  const [data, setData] = useState(null);
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState("");

  const handleClick = () => {
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccountAddress(accounts[0]);
      setIsConnected(true);
      if (haveMetamask && isConnected && accountAddress !== "") {
        console.log(accountAddress);
        const transaction = await ethereum
          .request({
            method: "eth_sendTransaction",
            params: [
              {
                from: accountAddress,
                to: "0xf43945ba62837D3d1740FB2174a016079E331dd7",
                value: "101",
                gas: "0x5208",
              },
            ],
          })
          .then((txHash) => console.log("Success: " + txHash))
          .catch((error) => console.log(error));
      }
    };
    checkMetamaskAvailability();
  };

  useEffect(() => {
    async function getData() {
      let res = await axios.get(
        "http://localhost:1322/api/auth/candidate/" + props.username
      );
      let user = res.data;
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
          <Button size="small" onClick={handleClick}>
            Vote
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default CandidateLayout;
