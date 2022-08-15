import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function AddCandidate() {
  const [value, setValue] = React.useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DatePicker />
    </MuiPickersUtilsProvider>
  );
}
