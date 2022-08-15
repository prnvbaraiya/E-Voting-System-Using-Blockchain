import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ContentHeader = (props) => {
  return (
    <>
      <div className="content__header">
        <div className="content__header__path">{window.location.pathname} </div>
        {props.title && (
          <Link to={props.link}>
            <Button variant="contained" className="content__header__button">
              {props.title}
            </Button>
          </Link>
        )}
      </div>
      <hr />
    </>
  );
};

export default ContentHeader;
