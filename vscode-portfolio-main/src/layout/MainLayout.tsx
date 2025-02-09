import { Outlet } from "react-router-dom";

import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import SideBarPage from "../page/SideBarPage";
import Navbar2 from "../components/navbar/Navbar2";
import Footer from "../components/footer/Footer";

const MainLayout = () => {
  const [theme] = useState<string>(
    localStorage.getItem("theme") ?? "synthwave"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="flex flex-col max-w-full h-screen overflow-hidden">
      <div className="bg-neutral text-base-content">
        <Navbar />
      </div>
      <div className="bg-black h-[0.5px] " />
      <div className="flex flex-1 overflow-hidden">
        <SideBarPage />
        <div className="border-l-[0.5px] border-black" />
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="bg-base-100">
            <Navbar2 />
          </div>
          <div className="px-4 py-2 bg-base-300 text-secondary  flex-1 font-jetbrains overflow-y-scroll ">
            <Outlet />
          </div>
        </div>
      </div>
      <div>
        <div className="bg-black h-[0.5px] " />
        <div className="bg-neutral text-base-content">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
