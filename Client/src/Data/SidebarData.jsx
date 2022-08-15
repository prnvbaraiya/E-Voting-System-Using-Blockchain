import React from "react";
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import PeopleIcon from "@mui/icons-material/People";
import LoopIcon from "@mui/icons-material/Loop";
import logo from "../logo.svg";

export const WebsiteDetails = {
  icon: logo,
  title: "Voting System",
};

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <AiOutlineDashboard />,
    link: "/admin/dashboard",
    id: "active",
  },
  {
    title: "User",
    icon: <PeopleIcon />,
    link: "/admin/user",
    id: "",
  },
  {
    title: "Candidate",
    icon: <AiOutlineUser />,
    link: "/admin/candidate",
    id: "",
  },
  {
    title: "Election",
    icon: <HowToVoteIcon />,
    link: "/admin/election",
    id: "",
  },
  {
    title: "Phase",
    icon: <LoopIcon />,
    link: "/admin/phase",
    id: "",
  },
];
