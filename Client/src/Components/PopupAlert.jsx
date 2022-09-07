import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

const PopupAlert = (props) => {
  const [open, setOpen] = useState(props.open);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          User Deleted
        </Alert>
      </Snackbar>
    </>
  );
};

export default PopupAlert;
