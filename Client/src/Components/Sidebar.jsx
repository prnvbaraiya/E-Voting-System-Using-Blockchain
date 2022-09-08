import "../css/SidebarStyle.css";
import { SidebarData, WebsiteDetails } from "../Data/SidebarData";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  const handleClick = (title) => {
    // console.log(title);
  };

  return (
    <>
      <div className="container">
        <div className="sidebar">
          <div className="website__details">
            <div className="website__logo">
              <img src={WebsiteDetails.icon} alt="Website Logo" />
            </div>
            <div className="website__title">{WebsiteDetails.title}</div>
          </div>
          <hr />
          <ul className="sidebar__items">
            {SidebarData.map((item, index) => {
              return (
                <Link to={item.link} key={index}>
                  <li
                    id={item.id}
                    onClick={handleClick(item.title)}
                    key={index}
                    className="row"
                  >
                    <div id="icon">{item.icon}</div>
                    <div id="title">{item.title}</div>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="container">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
