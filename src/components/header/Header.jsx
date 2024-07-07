import React from "react";
import Breadcrumb from "../ui/Breadcrumb";
import { useLocation } from "react-router-dom";
import Avatar from "../ui/Avatar";
import Dropdown from "../ui/Dropdown";
import InputSearch from "../ui/InputSearch";

const Header = () => {
  const location = useLocation();

  const logout = async () => {
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div className="">
      <div className="py-5 flex items-center justify-between">
        <Breadcrumb title={location.pathname} />
        <div className="flex items-center space-x-5">
          <InputSearch />
          <Dropdown content={<Avatar size="small" />} onClick={logout} />
        </div>
      </div>
    </div>
  );
};

export default Header;
