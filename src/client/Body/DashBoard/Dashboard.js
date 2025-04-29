import React, { useEffect, useState } from "react";
import GymMemberList from "./GymMemberList";
import ChartsData from "./Charts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserPlus, FaUsers, FaDumbbell, FaFlag } from "react-icons/fa";

function Dashboard() {
  const [totalClient, setTotalClient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    totalExercises: 0,
    completedGoals: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/dashboard/stats', {
        withCredentials: true,
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const response = await axios.get('http://localhost:8000/dashboard/recent-activity', {
        withCredentials: true,
      });
      setRecentActivity(response.data.activities);
    } catch (error) {
      console.error('Error fetching recent activity:', error);
    }
  };

  useEffect(() => {
    // fetchClients();
    // fetchStats();
    // fetchRecentActivity();
    fetchData();
  }, []);

  const fetchClients = async (term = "") => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/getGymUsers`, {
        withCredentials: true,
      });
      if (response) setTotalClient(response.data.clients.length);
    } catch (err) {
      setLoading(false);
      console.log("Error");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchClients();
  //   // Fetch dashboard stats from your API
  //   const fetchStats = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8000/dashboard/stats',{
  //         withCredentials: true,
  //       });
  //       setStats(response.data);
  //     } catch (error) {
  //       console.error('Error fetching dashboard stats:', error);
  //     }
  //   };

  //   fetchStats();
  // }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/getgymusersStatistics`,
        { withCredentials: true }
      );
       //setClientData(response.data.clientdata);
      // setSubscriptionData(response.data.subscriptionData);
      setTotalClient(response.data.totalClients);
    } catch (err) {
      console.log("Error loading more clients", err);
    }
  };

  const navigate = useNavigate();

  const statCards = [
    {
      title: 'Total Members',
      value: totalClient,
      icon: <FaUsers className="text-yellow-500" />,
      color: 'bg-blue-600'
    },
    {
      title: 'Active Members',
      value: totalClient,
      icon: <FaUsers className="text-yellow-500" />,
      color: 'bg-green-600'
    },
    // {
    //   title: 'Total Exercises',
    //   value: stats.totalExercises,
    //   icon: <FaDumbbell className="text-yellow-500" />,
    //   color: 'bg-purple-600'
    // },
    // {
    //   title: 'Completed Goals',
    //   value: stats.completedGoals,
    //   icon: <FaFlag className="text-yellow-500" />,
    //   color: 'bg-red-600'
    // }
  ];

  return (
    <div className="w-full px-4 py-6 bg-gray-900 min-h-screen">
      {loading ? (
        <div className="w-full flex justify-center items-center h-[calc(100vh-140px)]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      ) : totalClient === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col justify-center items-center h-[calc(100vh-140px)] text-center"
        >
          <div className="bg-gray-800 rounded-xl shadow-2xl p-12 max-w-2xl w-full">
            <div className="text-yellow-500 text-6xl mb-6 flex justify-center">
              <FaUserPlus />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">No Clients Yet</h2>
            <p className="text-gray-300 text-xl mb-8">
              You haven't registered any gym members yet. Start by adding your first client to manage their memberships and track their progress.
            </p>
            <button
              onClick={() => navigate("/enroll")}
              className="px-8 py-4 bg-yellow-500 text-white text-xl font-semibold rounded-lg hover:bg-yellow-400 transition duration-200 flex items-center gap-2 mx-auto"
            >
              <FaUserPlus />
              Add Your First Client
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">Dashboard</h1>
          
          {/* Stats Grid - Responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statCards.map((card, index) => (
              <div
                key={index}
                className={`${card.color} rounded-lg p-4 shadow-lg transform transition-transform hover:scale-105`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm md:text-base">{card.title}</p>
                    <p className="text-white text-2xl md:text-3xl font-bold">{card.value}</p>
                  </div>
                  <div className="text-3xl md:text-4xl">{card.icon}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity Section - Mobile Optimized */}
          <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-yellow-500 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
                    <div className={`bg-${activity.type === 'member' ? 'green' : activity.type === 'exercise' ? 'blue' : 'purple'}-500 p-2 rounded-full`}>
                      {activity.icon === 'FaUsers' && <FaUsers className="text-white" />}
                      {activity.icon === 'FaDumbbell' && <FaDumbbell className="text-white" />}
                      {activity.icon === 'FaFlag' && <FaFlag className="text-white" />}
                    </div>
                    <div>
                      <p className="text-white font-medium">{activity.title}</p>
                      <p className="text-gray-400 text-sm">{activity.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-400">
                  No recent activity to display
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions - Mobile Optimized */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate("/enroll")}
              className="bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Add Member
            </button>
            <button 
              onClick={() => navigate("/reports")}
              className="bg-gray-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors"
            >
              View Reports
            </button>
          </div>

          <ChartsData />
          <GymMemberList />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
