import React, { useState } from 'react';
import { IoNotifications } from "react-icons/io5";
import { MdAccountCircle, MdLogout } from 'react-icons/md';

function Header({ onLogout }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  return (
    <div className="w-full h-[70px] bg-gray-900 border-b border-gray-800 flex justify-between items-center px-6">
      <div className="text-yellow-500 text-xl font-bold">MyGym</div>
      
      <div className="flex items-center space-x-4">
        <div className="text-gray-300 hover:text-yellow-500 cursor-pointer">
          <IoNotifications size={24} />
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="text-gray-300 hover:text-yellow-500 focus:outline-none"
          >
            <MdAccountCircle size={24} />
          </button>

          {/* Show logout option only on mobile */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 md:hidden">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-yellow-500"
              >
                <MdLogout className="mr-2" size={20} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;