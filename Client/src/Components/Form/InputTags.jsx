import { Autocomplete, TextField, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

const InputTags = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const users = await axios.get(
          "http://localhost:1322/api/auth/candidates"
        );
        setData(users.data);
      } catch (e) {
        console.log("Server Error : " + e);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <Stack spacing={3}>
        <Autocomplete
          multiple
          required
          onChange={(event, value) => {
            props.setCandidates(value);
          }}
          id="tags-outlined"
          options={data}
          getOptionLabel={(option) => option.username}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              name="tages[]"
              label="Select Candidates"
              placeholder="Candidates"
            />
          )}
        />
      </Stack>
    </div>
  );
};

export default InputTags;
