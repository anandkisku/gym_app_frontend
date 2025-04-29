import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
  BarChart,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  ChartLegend
);

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "white",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>{payload[0].payload.status}:</strong> {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

function ChartsData() {
  const [clientdata, setClientData] = useState(null);
  const [joinedUsersData, setJoinedUsersData] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [totalClients, setTotalClients] = useState(null);
  const [totaAmout, setTotalAmout] = useState(null);
  const [year, setYear] = useState(new Date(2025, 0, 1).getFullYear())

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/getgymusersStatistics`,
        { withCredentials: true }
      );
      setClientData(response.data.clientdata);
      setSubscriptionData(response.data.subscriptionData);
      setTotalClients(response.data.totalClients);
      setTotalAmout(response.data.totalAmout);
    } catch (err) {
      console.log("Error loading more clients", err);
    }
  };

  const fetchDataForYear = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/getgymusersStatistics?year=${year}`,
        { withCredentials: true }
      );
      setJoinedUsersData(response.data.joinedUsersData);
    } catch (err) {
      console.log("Error loading more clients", err);
    }
  };

  useEffect(()=>{
   fetchDataForYear()
  },[year])

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        }
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          color: "white",
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)"
        }
      },
      x: {
        ticks: {
          color: "white",
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)"
        }
      }
    }
  };

  const labels = ["January", "February", "March", "April", "May", "June", "July"];

  const data = {
    labels,
    datasets: [
      {
        label: "New Members",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "rgb(234, 179, 8)",
        backgroundColor: "rgba(234, 179, 8, 0.5)",
      },
      {
        label: "Active Members",
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  return (
    <div className="w-full bg-gray-800 rounded-xl shadow-xl p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-yellow-500">Dashboard Overview</h2>
        <div className="flex items-center gap-2">
          <label className="text-gray-300">Year:</label>
          <select 
            value={year} 
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-700 rounded-lg p-4 shadow-md">
          <h3 className="text-gray-300 text-sm mb-1">Total Clients</h3>
          <p className="text-3xl font-bold text-yellow-500">{totalClients || 0}</p>
        </div>
        <div className="bg-gray-700 rounded-lg p-4 shadow-md">
          <h3 className="text-gray-300 text-sm mb-1">Active Memberships</h3>
          <p className="text-3xl font-bold text-yellow-500">
            {clientdata?.filter(client => client.status === "Completed")[0].value || 0}
          </p>
        </div>
        <div className="bg-gray-700 rounded-lg p-4 shadow-md">
          <h3 className="text-gray-300 text-sm mb-1">Pending Payments</h3>
          <p className="text-3xl font-bold text-yellow-500">
            {clientdata?.filter(client => client.status === "Pending")[0].value || 0}
          </p>
        </div>
        <div className="bg-gray-700 rounded-lg p-4 shadow-md">
          <h3 className="text-gray-300 text-sm mb-1">Monthly Revenue</h3>
          <p className="text-3xl font-bold text-yellow-500">
            ₹{totaAmout}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-700 rounded-lg p-4 shadow-md h-80">
          <h3 className="text-gray-300 text-lg mb-4">Subscription Types</h3>
          <PieChart width={400} height={250}>
            <Pie
              data={subscriptionData || []}
              cx={200}
              cy={125}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={1}
              dataKey="value"
              nameKey="type"
            >
              {subscriptionData?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <RechartsTooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
                color: '#eab308'
              }}
            />
          </PieChart>
        </div>
        <div className="bg-gray-700 rounded-lg p-4 shadow-md h-80">
          <h3 className="text-gray-300 text-lg mb-4">Monthly Joining Trends</h3>
          <BarChart width={400} height={250} data={joinedUsersData}>
            <XAxis
              dataKey="month"
              scale="point"
              padding={{ left: 20, right: 10 }}
              stroke="#9CA3AF"
            />
            <YAxis stroke="#9CA3AF" />
            <RechartsTooltip
              contentStyle={{ 
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
                color: '#E5E7EB'
              }}
            />
            <Bar
              dataKey="count"
              fill="#EAB308"
              background={{ fill: '#374151' }}
            />
          </BarChart>
        </div>
      </div>
      <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-yellow-500 mb-4">Member Statistics</h2>
        <div className="h-[300px] md:h-[400px] w-full">
          <Line options={options} data={data} />
           
        </div>
      </div>
    </div>
  );
}

export default ChartsData;
