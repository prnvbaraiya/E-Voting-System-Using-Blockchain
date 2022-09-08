import React from "react";
import { Toolbar, Typography, AppBar, Grid } from "@mui/material";
import HowToVoteOutlinedIcon from "@mui/icons-material/HowToVoteOutlined";
import { NavbarData } from "../../Data/NavbarData";
import { Link } from "react-router-dom";

// react.school/material-ui

export default function ButtonAppBar() {
  const style = {
    logo: {
      fontSize: 35,
      paddingRight: 10,
    },
    navLink: {
      fontSize: 20,
      color: "white",
    },
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <Grid container spacing={0}>
            <Grid item xs={6} display="flex">
              <HowToVoteOutlinedIcon style={style.logo} />
              <Typography variant="h5">Voting System</Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container gap={6} justifyContent="flex-end">
                {NavbarData.map((item, index) => {
                  return (
                    <Link to={item.link} key={index}>
                      <Typography style={style.navLink}>
                        {item.title}
                      </Typography>
                    </Link>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
