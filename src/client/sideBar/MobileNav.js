import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdDashboard, MdPersonAdd, MdFitnessCenter, MdFlag, MdInfo, MdSettings } from 'react-icons/md';

function MobileNav() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: <MdDashboard size={24} />, label: 'Dashboard' },
    { path: '/enroll', icon: <MdPersonAdd size={24} />, label: 'Enroll' },
    { path: '/exercise', icon: <MdFitnessCenter size={24} />, label: 'Exercise' },
    { path: '/goal', icon: <MdFlag size={24} />, label: 'Goal' },
    { path: '/information', icon: <MdInfo size={24} />, label: 'Info' },
    { path: '/settings', icon: <MdSettings size={24} />, label: 'Settings' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center w-1/6 h-full ${
              location.pathname === item.path
                ? 'text-yellow-500'
                : 'text-gray-400 hover:text-yellow-500'
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MobileNav; 