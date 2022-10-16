import { Autocomplete, TextField, Chip } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverLink } from "../../Data/Variables";

const InputTags = (props) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const users = await axios.get(serverLink + "candidates");
        let cand = users.data;
        setData(cand);
        let k = cand.filter((tmp) =>
          props.candidates.includes(tmp.username) ? tmp : null
        );
        setValue(k);
      } catch (e) {
        console.log("Server Error : " + e);
      }
    }
    getData();
  }, []);

  return (
    <>
      <Autocomplete
        multiple
        readOnly={props.readOnly}
        id="fixed-tags-demo"
        value={value}
        onChange={(event, nvalue) => {
          setValue([...nvalue]);
          props.setCandidates(value);
        }}
        options={data}
        getOptionLabel={(option) => option.username}
        filterSelectedOptions
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip label={option.username} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            // required
            {...params}
            name="tages[]"
            label="Select Candidates"
            placeholder="Candidates"
          />
        )}
      />
    </>
  );
};

export default InputTags;
