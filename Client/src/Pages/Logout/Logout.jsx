import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/admin");
  });
  return <div>Logout</div>;
};

export default Logout;
