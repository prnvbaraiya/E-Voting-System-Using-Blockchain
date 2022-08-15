import React from "react";
import { TextField } from "@mui/material";

const InputField = (props) => {
  return (
    <div>
      <TextField
        required={!props.required}
        autoComplete="on"
        id={props.name}
        type={props.type ? props.type : "text"}
        name={props.name}
        label={props.label}
        fullWidth={props.fullWidth}
        variant="outlined"
      />
    </div>
  );
};

export default InputField;
