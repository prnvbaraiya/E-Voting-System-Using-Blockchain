import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Toolbar, Typography, AppBar, IconButton } from "@mui/material";

// react.school/material-ui

export default function ButtonAppBar() {
  const [example, setExample] = useState("primary");
  const isCustomColor = example === "customColor";
  const isCustomHeight = example === "customHeight";
  return (
    <React.Fragment>
      <AppBar color={isCustomColor || isCustomHeight ? "primary" : example}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">AppBar</Typography>
          <IconButton color="inherit" onClick={() => setExample("default")}>
            1
          </IconButton>
          <IconButton color="inherit" onClick={() => setExample("primary")}>
            2
          </IconButton>
          <IconButton color="inherit" onClick={() => setExample("secondary")}>
            3
          </IconButton>
          <IconButton color="inherit" onClick={() => setExample("transparent")}>
            4
          </IconButton>
          <IconButton color="inherit" onClick={() => setExample("customColor")}>
            5
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => setExample("customHeight")}
          >
            6
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Typography>
        This content doesn't appear below the AppBar because we added an
        additional Toolbar component above, this is the recommended approach.{" "}
      </Typography>
      <Typography>
        Change the AppBar example by clicking on one of the numbers above.
      </Typography>
      <Typography>
        <ul>
          <li> 1: color: default </li>
          <li> 2: color: primary </li>
          <li> 3: color: secondary </li>
          <li> 4: color: transparent </li>
          <li> 5: custom color class </li>
          <li> 6: custom height class </li>
        </ul>
      </Typography>
    </React.Fragment>
  );
}
