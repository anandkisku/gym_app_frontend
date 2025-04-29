import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaEdit, FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import UpdateUser from "./updateUser";
const maleImage = require("./man.png");
const femaleImage = require("./human.png");

function GymMemberList() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeButton, setActiveButton] = useState("All");
  const [subscriptionButton, setSubscriptionButton] = useState("All");
  const [sortDirection, setSortDirection] = useState("asc");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const pageSize = 10;

  const navigate = useNavigate();

  const fetchClients = async (term = "") => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/getGymUsers?status=${
          activeButton !== "All" ? activeButton : ""
        }&subscription=${
          subscriptionButton !== "All" ? subscriptionButton : ""
        }&sort=${sortDirection}&pageSize=${pageSize}&pageIndex=${pageIndex}&search=${
          term.length > 2 ? term : ""
        }`,
        { withCredentials: true }
      );
      
      setMembers(response.data.data);
      setTotalClients(response.data.totalClients);
    } catch (err) {
      console.error("Error loading clients:", err);
      setMembers([]);
      setTotalClients(0);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      setLoadMoreLoading(true);
      const response = await axios.get(
        `http://localhost:8000/getGymUsers?status=${
          activeButton !== "All" ? activeButton : ""
        }&subscription=${
          subscriptionButton !== "All" ? subscriptionButton : ""
        }&sort=${sortDirection}&pageSize=${pageSize}&pageIndex=${
          pageIndex + 1
        }&search=${searchTerm}`,
        { withCredentials: true }
      );
      
      setMembers([...members, ...response.data.data]);
      setPageIndex(pageIndex + 1);
    } catch (err) {
      console.error("Error loading more clients:", err);
    } finally {
      setLoadMoreLoading(false);
    }
  };

  // Initial load without search term
  useEffect(() => {
    fetchClients();
  }, [activeButton, sortDirection, subscriptionButton]);

  // Separate effect for search with debounce
  useEffect(() => {
    if (searchTerm.length > 2) {
      const debounceTimer = setTimeout(() => {
        setPageIndex(0);
        fetchClients(searchTerm);
      }, 600);
      return () => clearTimeout(debounceTimer);
    }
  }, [searchTerm]);

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-yellow-500">Gym Members</h2>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-400" />
          </div>
          <button
            onClick={() => navigate("/enroll")}
            className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
          >
            Register New Member
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto">
        <div className="flex gap-2 w-full">
        {["All", "Pending", "Completed"].map((btn) => (
          <button
            key={btn}
            onClick={() => {
              setLoading(true);
              setPageIndex(0);
              setActiveButton(btn);
            }}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeButton === btn
                ? "bg-yellow-500 text-gray-900"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {btn}
          </button>
        ))}
        </div>
        <div className="w-full flex justify-end gap-2">
        {["All", "Monthly", "2 Months", "Quarterly", "Half Yearly", "Yearly"].map((btn) => (
          <button
            key={btn}
            onClick={() => {
              setLoading(true);
              setPageIndex(0);
              setSubscriptionButton(btn);
            }}
            className={`px-4 py-2 rounded-lg transition-colors ${
              subscriptionButton === btn
                ? "bg-yellow-500 text-gray-900"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {btn}
          </button>
        ))}
        </div>
      </div>

      <div className="text-gray-300 mb-4">
        {`${activeButton} status gym members: ${totalClients}`}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="py-3 px-4 text-gray-400 font-medium">Image</th>
              <th className="py-3 px-4 text-gray-400 font-medium">
                <div className="flex items-center gap-2">
                  Name
                  <span className="cursor-pointer">
                    {sortDirection === "asc" ? (
                      <FaSortAlphaDown
                        onClick={() => setSortDirection("desc")}
                        className="text-yellow-500"
                      />
                    ) : (
                      <FaSortAlphaDownAlt
                        onClick={() => setSortDirection("asc")}
                        className="text-yellow-500"
                      />
                    )}
                  </span>
                </div>
              </th>
              <th className="py-3 px-4 text-gray-400 font-medium">Payment Status</th>
              <th className="py-3 px-4 text-gray-400 font-medium">Gender</th>
              <th className="py-3 px-4 text-gray-400 font-medium">Phone</th>
              <th className="py-3 px-4 text-gray-400 font-medium">Next Payment</th>
              <th className="py-3 px-4 text-gray-400 font-medium">Last Payment</th>
              <th className="py-3 px-4 text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="py-4">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500"></div>
                  </div>
                </td>
              </tr>
            ) : members && members.length > 0 ? (
              members.map((member) => (
                <tr key={member._id} className="border-b border-gray-700">
                  <td className="py-3 px-4">
                    <img
                      src={member.gender === "Male" ? maleImage : femaleImage}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="py-3 px-4 text-white">{member.name}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      member.paymentStatus === "Completed"
                        ? "bg-green-500"
                        : "bg-orange-500"
                    }`}>
                      {member.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-white">{member.gender}</td>
                  <td className="py-3 px-4 text-white">{member.phone}</td>
                  <td className="py-3 px-4 text-white">{member.nextPaymentDate}</td>
                  <td className="py-3 px-4 text-white">{member.lastPaymentDate}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => {
                        setSelectedMember(member);
                        setModalOpen(true);
                      }}
                      className="text-yellow-500 hover:text-yellow-400"
                    >
                      <FaEdit size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-4 text-center text-gray-400">
                  No members found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalClients > pageSize && pageSize * pageIndex < totalClients && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMore}
            disabled={loadMoreLoading}
            className={`px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 transition-colors ${
              loadMoreLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loadMoreLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {modalOpen && (
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          className="flex items-center justify-center"
        >
          <UpdateUser
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            selectedMember={selectedMember}
            setSelectedMember={setSelectedMember}
            handleCloseModal={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default GymMemberList;

export function ErrorBoundary({children}){
  const [isError, setIsError] = useState(false)

  useEffect(()=>{
   
    window.addEventListener("error",(error)=>{
      if(error) setIsError(true)
    })

  },[])

  if(isError) return <p>Something went wrong ! </p>
  return children;
}
