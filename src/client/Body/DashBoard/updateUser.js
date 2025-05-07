import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

function UpdateUser({ selectedMember, handleCloseModal }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    feePaid: "",
    paymentStatus: "",
    nextPaymentDate: "",
    lastPaymentDate: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedMember) {
      setFormData({
        name: selectedMember.name || "",
        email: selectedMember.email || "",
        phone: selectedMember.phone || "",
        gender: selectedMember.gender || "",
        address: selectedMember.address || "",
        feePaid: selectedMember.feePaid || "",
        paymentStatus: selectedMember.paymentStatus || "",
        nextPaymentDate: selectedMember.nextPaymentDate || "",
        lastPaymentDate: selectedMember.lastPaymentDate || "",
      });
    }
  }, [selectedMember]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:8000/updateGymUser/${selectedMember._id}`,
        formData,
        { withCredentials: true }
      );
      toast.success("Member updated successfully!");
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating member");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      setLoading(true);
      try {
        await axios.delete(
          `http://localhost:8000/deleteGymUser/${selectedMember._id}`,
          { withCredentials: true }
        );
        toast.success("Member deleted successfully!");
        handleCloseModal();
      } catch (error) {
        toast.error(error.response?.data?.message || "Error deleting member");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl mx-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-yellow-500">Update Member</h2>
        <button
          onClick={handleCloseModal}
          className="text-yellow-500 text-xl h-8 flex justify-center items-center w-8 hover:text-yellow-600 focus:outline-none text-white"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white  rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block  mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white  rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block  mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white  rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block  mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white  rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="block  mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white  rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block  mb-2">Fee Paid</label>
            <input
              type="number"
              name="feePaid"
              value={formData.feePaid}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white  rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block  mb-2">Payment Status</label>
            <select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white  rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block  mb-2">Next Payment Date</label>
            <input
              type="date"
              name="nextPaymentDate"
              value={formData.nextPaymentDate ? new Date(formData.nextPaymentDate).toISOString().split("T")[0] : ""}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white  rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block  mb-2">Last Payment Date</label>
            <input
              type="date"
              name="lastPaymentDate"
              value={formData.lastPaymentDate ? new Date(formData.lastPaymentDate).toISOString().split("T")[0] : ""}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white  rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
          >
            <FaTrash />
            Delete Member
          </button>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Updating..." : "Update Member"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;
