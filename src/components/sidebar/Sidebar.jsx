import React from "react";
import { House, UserRoundCog, Newspaper } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const menus = [
  {
    id: 1,
    name: "Dashboard",
    route: "/",
    icon: <House size={16} />,
  },
  {
    id: 2,
    name: "User Management",
    route: "/user-management",
    icon: <UserRoundCog size={16} />,
  },
  {
    id: 3,
    name: "Article Management",
    route: "/article-management",
    icon: <Newspaper size={16} />,
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="fixed w-1/4 h-full top-0 left-0 p-5">
      <div className="bg-white border border-gray-300 rounded-xl h-full p-6">
        <div className="flex items-center justify-center">
          <img src="/logo.png" alt="logo" className="w-[75px] rounded-full" />
        </div>
        <div className="flex flex-col items-start space-y-2 justify-center mt-10">
          {menus.map((menu) => (
            <NavLink
              to={menu.route}
              className={`flex font-semibold items-center gap-3 w-full px-4 py-4 hover:bg-gray-200 hover:rounded-lg ${
                location.pathname === menu.route
                  ? "bg-primary text-white rounded-lg hover:bg-primary"
                  : ""
              }`}
              key={menu.id}
            >
              <span>{menu.icon}</span> {menu.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
