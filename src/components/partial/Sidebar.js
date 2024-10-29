import React, { useContext, useState } from 'react';
import { HomeIcon, SearchIcon, PlusCircleIcon, HeartIcon, UserIcon, MenuIcon, CogIcon, LogoutIcon } from '@heroicons/react/solid';
import { Link, useNavigate } from 'react-router-dom'; // For navigation
import { InfoContext } from "../context/InfoContext";


const Sidebar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false); // Trạng thái để kiểm soát menu con
  const navigate = useNavigate(); // To navigate after logout
  const { setUser } = useContext(InfoContext);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen); // Chuyển đổi trạng thái khi nhấp vào "More"
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Xóa token khỏi localStorage
    localStorage.removeItem("username"); // Xóa token khỏi localStorage
    setUser(null); // Cập nhật trạng thái user về null
    navigate("/login"); // Chuyển hướng về trang đăng nhập
  };

  return (
    <div className="sticky top-0 flex flex-col h-screen bg-white border-r border-gray-200 w-1/6 text-[#000000]">
      <div className="flex items-center justify-start h-16 border-b border-gray-200 px-6 py-12">
        <Link to={"/home"}>
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png' className="w-3/4" alt="Instagram Logo" />
        </Link>
      </div>
      <nav className="flex flex-col flex-grow p-4">
        <Link to={"/home"} className="flex items-center py-3 px-2 hover:bg-gray-100 rounded-lg">
          <HomeIcon className="h-6 w-6 mr-2" />
          Home
        </Link>
        <Link to={"/search"} className="flex items-center py-3 px-2 hover:bg-gray-100 rounded-lg">
          <SearchIcon className="h-6 w-6 mr-2" />
          Search
        </Link>
        <Link to={"/posts"} className="flex items-center py-3 px-2 hover:bg-gray-100 rounded-lg">
          <HeartIcon className="h-6 w-6 mr-2" />
          Posts
        </Link>
        <Link to={"/create"} className="flex items-center py-3 px-2 hover:bg-gray-100 rounded-lg">
          <PlusCircleIcon className="h-6 w-6 mr-2" />
          Create
        </Link>
        <Link to={"/profile"} className="flex items-center py-3 px-2 hover:bg-gray-100 rounded-lg">
          <UserIcon className="h-6 w-6 mr-2" />
          Profile
        </Link>
      </nav>
      <div className="px-4 pb-6 relative">
        <div onClick={toggleDropdown} className="flex items-center py-3 px-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <MenuIcon className="h-6 w-6 mr-2" />
          More
        </div>
        {/* Menu con cho "More" xuất hiện ở trên */}
        {isDropdownOpen && (
          <nav className="absolute left-4 bottom-full mb-2 rounded-lg bg-gray-100 w-56 shadow-md">
            <a href="#" className="flex items-center py-3 px-2 hover:bg-gray-200 rounded-lg m-2">
              <CogIcon className="h-6 w-6 mr-2" />
              Settings
            </a>
            <hr />
            <button
              onClick={handleLogout} // Trigger logout function
              className="w-full"
            >
              <span className="flex items-center py-3 px-2 hover:bg-gray-200 rounded-lg m-2">
                <LogoutIcon className="h-6 w-6 mr-2" />
                Logout
              </span>
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Sidebar;