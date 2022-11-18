import React from "react";
import { TextField } from "@mui/material";
import { useEffect } from "react";

const InputField = (props) => {
  useEffect(() => {
    console.log(props.type);
  }, []);
  return (
    <div>
      <TextField
        required={!props.required}
        autoComplete="on"
        id={props.id}
        type={props.type ? props.type : "text"}
        name={props.name}
        label={props.label}
        fullWidth={props.fullWidth}
        variant="outlined"
        defaultValue={props.value ? props.value : ""}
        InputProps={props.inputProps}
        disabled={props.disabled}
      />
    </div>
  );
};

export default InputField;
