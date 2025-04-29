import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBullseye, FaPlus, FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { Box, Modal } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

function Goal() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentGoal, setCurrentGoal] = useState({
    clientName: "",
    title: "",
    description: "",
    targetStartDate: "",
    targetDate: "",
    status: "In Progress",
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/getGoals", {
        withCredentials: true,
      });
      setGoals(response.data.goals || []);
    } catch (error) {
      console.error("Error fetching goals:", error);
      toast.error("Failed to load goals");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (goal = null) => {
    if (goal) {
      setCurrentGoal(goal);
      setEditMode(true);
    } else {
      setCurrentGoal({
        title: "",
        description: "",
        targetDate: "",
        status: "In Progress",
      });
      setEditMode(false);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentGoal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:8000/updateGoal/${currentGoal._id}`,
          currentGoal,
          { withCredentials: true }
        );
        toast.success("Goal updated successfully");
      } else {
        await axios.post("http://localhost:8000/createGoal", currentGoal, {
          withCredentials: true,
        });
        toast.success("Goal added successfully");
      }
      handleCloseModal();
      fetchGoals();
    } catch (error) {
      console.error("Error saving goal:", error);
      toast.error("Failed to save goal");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      try {
        await axios.delete(`http://localhost:8000/deleteGoal/${id}`, {
          withCredentials: true,
        });
        toast.success("Goal deleted successfully");
        fetchGoals();
      } catch (error) {
        console.error("Error deleting goal:", error);
        toast.error("Failed to delete goal");
      }
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "Completed" ? "In Progress" : "Completed";
    try {
      await axios.put(
        `http://localhost:8000/updateGoalStatus/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      toast.success(`Goal marked as ${newStatus}`);
      fetchGoals();
    } catch (error) {
      console.error("Error updating goal status:", error);
      toast.error("Failed to update goal status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-800 text-gray-800";
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-yellow-500">Business Goals</h2>
            <button
              onClick={() => handleOpenModal()}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition duration-200 flex items-center gap-2"
            >
              <FaPlus /> Add Goal
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : goals.length === 0 ? (
            <div className="text-center py-12">
              <FaBullseye className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Goals Set
              </h3>
              <p className="text-gray-500 mb-6">
                Set business goals to track your gym's growth and achievements
              </p>
              <button
                onClick={() => handleOpenModal()}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition duration-200"
              >
                Set Your First Goal
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.map((goal) => (
                <div
                  key={goal._id}
                  className="bg-gray-50 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-200"
                >
                  {" "}
                  <h3 className="text-xl font-semibold text-gray-800">
                  {goal.clientName}
                  </h3>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {goal.title}
                    </h4>
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() =>
                          handleStatusChange(goal._id, goal.status)
                        }
                        className={`text -white h-8 w-8 flex justify-center items-center rounded-full ${goal.status === "Completed" ? "text-green-600 hover:text-green-800" : "text-gray-400 hover:text-gray-600"} ${goal.status === "Completed" ? "bg-green-600 hover:bg-green-800" : "bg-gray-400 hover:bg-gray-600"}`}
                        title={
                          goal.status === "Completed"
                            ? "Mark as In Progress"
                            : "Mark as Completed"
                        }
                      >
                        <FaCheck className="text-white" />
                      </button>
                      <button
                        onClick={() => handleOpenModal(goal)}
                        className="text-yellow-500 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(goal._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-1">{goal.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">
                      Target: {new Date(goal.targetDate).toLocaleDateString()}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(goal.status)}`}
                    >
                      {goal.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="goal-modal-title"
        aria-describedby="goal-modal-description"
        className="flex items-center justify-center"
      >
        <Box className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {editMode ? "Edit Goal" : "Add New Goal"}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="clientName"
              >
                Client's name
              </label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={currentGoal.clientName}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Goal Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={currentGoal.title}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={currentGoal.description}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="targetStartDate"
              >
                Start Date
              </label>
              <input
                type="date"
                id="targetStartDate"
                name="targetStartDate"
                value={currentGoal.targetStartDate ? new Date(currentGoal.targetStartDate).toISOString().split("T")[0] : ""}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="targetDate"
              >
                Target Date
              </label>
              <input
                type="date"
                id="targetDate"
                name="targetDate"
                value={currentGoal.targetDate ? new Date(currentGoal.targetDate).toISOString().split("T")[0] : ""}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="status"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={currentGoal.status}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition duration-200"
              >
                {editMode ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default Goal;
