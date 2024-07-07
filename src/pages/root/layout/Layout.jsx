import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, CHECK } from "../../../config";
import Footer from "../../../components/footer/Footer";
import Overlay from "../../../components/ui/Overlay";

const Layout = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = JSON.parse(sessionStorage.getItem("token"));

      if (!token) {
        navigate("/auth/login");
      }

      try {
        const response = await axios.get(`${BASE_URL}${CHECK}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        const { status } = response.data;
        if (status === "error") {
          window.location.reload();
          navigate("/auth/login");
        }
      } catch (error) {
        navigate("/auth/login");
      }
    };

    checkToken();
  }, [navigate]);

  return (
    <div className="flex bg-[#F5F7F8] min-h-screen">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="w-3/4 px-6 flex flex-col justify-between relative">
        {isOpen && <Overlay />}
        <div>
          <Header />
          <Outlet context={[isOpen, setIsOpen]} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
