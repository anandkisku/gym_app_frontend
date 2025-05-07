import React from "react";
import { GiWeightLiftingUp } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { GoGoal } from "react-icons/go";
import { IoInformationCircle } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Sidebar({ onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  let pathname = location.pathname;

  const handleLogoutClick = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      onLogout();
      toast.success("Logged out successfully!");
      navigate("/login");
    }
  };

  return (
    <div className="min-w-[300px] min-h-screen bg-gray-900 border-r border-gray-800">
      <div className="h-[70px] flex justify-center items-center font-bold text-5xl text-yellow-500 border-b border-gray-800">
        <GiWeightLiftingUp />
      </div>
      <div className="py-8 pl-7 pr-4 border-b border-gray-800">
        <h3 className="w-full text-start font-extrabold text-yellow-500">MAIN MENU</h3>
        <Link to="/" className={` text-white flex gap-2 my-3 py-3 pl-2 hover:bg-gray-800 items-center h-10 text-[30px] hover:text-yellow-500 hover:rounded-lg cursor-pointer ${pathname==='/'?"text-yellow-500":""}`}>
          <MdDashboard />
          <h3 className="w-full text-start text-[18px] font-semibold">
            Dashboard
          </h3>
        </Link>
        <Link to="/enroll" className={` text-white flex gap-2 my-2 py-3 pl-2 hover:bg-gray-800 items-center h-10 text-[30px] hover:text-yellow-500 hover:rounded-lg cursor-pointer ${pathname==='/enroll'?"text-yellow-500":""}`}>
          <CgGym />
          <h3 className="w-full text-start text-[18px] font-semibold">
            Enroll Member
          </h3>
        </Link>
        <Link to="/exercise" className={` text-white flex gap-2 my-2 py-3 pl-2 hover:bg-gray-800 items-center h-10 text-[30px] hover:text-yellow-500 hover:rounded-lg cursor-pointer ${pathname==='/exercise'?"text-yellow-500":""}`}>
          <CgGym />
          <h3 className="w-full text-start text-[18px] font-semibold">
            Exercise
          </h3>
        </Link>
        <Link to="/goal" className={` text-white flex gap-2 my-2 py-3 pl-2 hover:bg-gray-800 items-center h-10 text-[30px] hover:text-yellow-500 hover:rounded-lg cursor-pointer ${pathname==='/goal'?"text-yellow-500":""}`}>
          <GoGoal />
          <h3 className="w-full text-start text-[18px] font-semibold">
            Goal
          </h3>
        </Link>
      </div>
      <div className="py-8 pl-7 pr-4">
        <h3 className="w-full text-start font-extrabold text-yellow-500">ACCOUNT</h3>
        <Link to="/information" className={` text-white flex gap-2 my-3 py-3 pl-2 hover:bg-gray-800 items-center h-10 text-[30px] hover:text-yellow-500 hover:rounded-lg cursor-pointer ${pathname==='/information'?"text-yellow-500":""}`}>
          <IoInformationCircle />
          <h3 className="w-full text-start text-[18px] font-semibold">
            Information
          </h3>
        </Link>
        <Link to="/settings" className={` text-white  flex gap-2 my-2 py-3 pl-2 hover:bg-gray-800 items-center h-10 text-[30px] hover:text-yellow-500 hover:rounded-lg cursor-pointer ${pathname==='/settings'?"text-yellow-500":""}`}>
          <IoMdSettings />
          <h3 className="w-full text-start text-[18px] font-semibold">
            Settings
          </h3>
        </Link>
        <button
          onClick={handleLogoutClick}
          className="w-full flex gap-2 my-2 py-3 pl-2 hover:bg-gray-800 items-center h-10 text-[30px] hover:text-yellow-500 hover:rounded-lg cursor-pointer"
        >
          <IoMdLogOut />
          <h3 className="w-full text-start text-[18px] font-semibold">
            Logout
          </h3>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
