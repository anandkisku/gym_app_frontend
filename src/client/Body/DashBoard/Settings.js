import React, { useState } from 'react';
import { FaMoon, FaSun, FaLock, FaBuilding, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [gymDetails, setGymDetails] = useState({
    name: 'Your Gym Name',
    address: 'Gym Address',
    phone: '1234567890',
    email: 'gym@example.com'
  });
  const [ownerDetails, setOwnerDetails] = useState({
    name: 'Owner Name',
    email: 'owner@example.com',
    phone: '1234567890'
  });

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    toast.success(`Switched to ${!isDarkMode ? 'dark' : 'light'} mode`);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    // Add API call to change password
    toast.success('Password changed successfully');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleGymDetailsUpdate = (e) => {
    e.preventDefault();
    // Add API call to update gym details
    toast.success('Gym details updated successfully');
  };

  const handleOwnerDetailsUpdate = (e) => {
    e.preventDefault();
    // Add API call to update owner details
    toast.success('Owner details updated successfully');
  };

  return (
    <div className="w-full min-h-screen bg-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Settings</h2>

        {/* Theme Toggle */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isDarkMode ? <FaMoon className="text-2xl text-gray-800" /> : <FaSun className="text-2xl text-gray-800" />}
              <h3 className="text-xl font-semibold text-gray-800">Theme</h3>
            </div>
            <button
              onClick={handleThemeToggle}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition duration-200"
            >
              {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FaLock className="text-2xl text-gray-800" />
            <h3 className="text-xl font-semibold text-gray-800">Change Password</h3>
          </div>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition duration-200"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Gym Details */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FaBuilding className="text-2xl text-gray-800" />
            <h3 className="text-xl font-semibold text-gray-800">Gym Details</h3>
          </div>
          <form onSubmit={handleGymDetailsUpdate} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gymName">
                Gym Name
              </label>
              <input
                type="text"
                id="gymName"
                value={gymDetails.name}
                onChange={(e) => setGymDetails({ ...gymDetails, name: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gymAddress">
                Address
              </label>
              <input
                type="text"
                id="gymAddress"
                value={gymDetails.address}
                onChange={(e) => setGymDetails({ ...gymDetails, address: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gymPhone">
                Phone
              </label>
              <input
                type="tel"
                id="gymPhone"
                value={gymDetails.phone}
                onChange={(e) => setGymDetails({ ...gymDetails, phone: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gymEmail">
                Email
              </label>
              <input
                type="email"
                id="gymEmail"
                value={gymDetails.email}
                onChange={(e) => setGymDetails({ ...gymDetails, email: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition duration-200"
            >
              Update Gym Details
            </button>
          </form>
        </div>

        {/* Owner Details */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FaUser className="text-2xl text-gray-800" />
            <h3 className="text-xl font-semibold text-gray-800">Owner Details</h3>
          </div>
          <form onSubmit={handleOwnerDetailsUpdate} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ownerName">
                Owner Name
              </label>
              <input
                type="text"
                id="ownerName"
                value={ownerDetails.name}
                onChange={(e) => setOwnerDetails({ ...ownerDetails, name: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ownerEmail">
                Email
              </label>
              <input
                type="email"
                id="ownerEmail"
                value={ownerDetails.email}
                onChange={(e) => setOwnerDetails({ ...ownerDetails, email: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ownerPhone">
                Phone
              </label>
              <input
                type="tel"
                id="ownerPhone"
                value={ownerDetails.phone}
                onChange={(e) => setOwnerDetails({ ...ownerDetails, phone: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition duration-200"
            >
              Update Owner Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings; 