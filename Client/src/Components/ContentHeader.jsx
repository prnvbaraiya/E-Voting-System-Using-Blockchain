import { Breadcrumbs, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ContentHeader = (props) => {
  const url = window.location.pathname;
  const filename = url.substring(url.lastIndexOf("/admin") + 7);
  const data = filename.split("/");

  return (
    <>
      <div className="content__header">
        <div className="content__header__path">
          <Breadcrumbs maxItems={4} aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/admin/dashboard">
              Home
            </Link>
            {data.map((item, index) => {
              return (
                <Link underline="hover" key={index} color="inherit" to="/">
                  {item}
                </Link>
              );
            })}
          </Breadcrumbs>
        </div>
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
