import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDumbbell, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { Box, Modal } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';

function Exercise() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentExercise, setCurrentExercise] = useState({
    name: '',
    description: '',
    sets: '',
    reps: '',
    category: 'Strength'
  });

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/getExercises', {
        withCredentials: true
      });
      setExercises(response.data.exercises || []);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      toast.error('Failed to load exercises');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (exercise = null) => {
    if (exercise) {
      setCurrentExercise(exercise);
      setEditMode(true);
    } else {
      setCurrentExercise({
        name: '',
        description: '',
        sets: '',
        reps: '',
        category: 'Strength'
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
    setCurrentExercise(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:8000/updateExercise/${currentExercise._id}`,
          currentExercise,
          { withCredentials: true }
        );
        toast.success('Exercise updated successfully');
      } else {
        await axios.post(
          'http://localhost:8000/createExercise',
          currentExercise,
          { withCredentials: true }
        );
        toast.success('Exercise added successfully');
      }
      handleCloseModal();
      fetchExercises();
    } catch (error) {
      console.error('Error saving exercise:', error);
      toast.error('Failed to save exercise');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      try {
        await axios.delete(`http://localhost:8000/deleteExercise/${id}`, {
          withCredentials: true
        });
        toast.success('Exercise deleted successfully');
        fetchExercises();
      } catch (error) {
        console.error('Error deleting exercise:', error);
        toast.error('Failed to delete exercise');
      }
    }
  };

  const categories = ['Strength', 'Cardio', 'Flexibility', 'Balance', 'Other'];

  return (
    <div className="w-full min-h-screen bg-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-yellow-500">Exercise Library</h2>
            <button
              onClick={() => handleOpenModal()}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition duration-200 flex items-center gap-2"
            >
              <FaPlus /> Add Exercise
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : exercises.length === 0 ? (
            <div className="text-center py-12">
              <FaDumbbell className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Exercises Yet</h3>
              <p className="text-gray-500 mb-6">Add exercises to your library to track client workouts</p>
              <button
                onClick={() => handleOpenModal()}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition duration-200"
              >
                Add Your First Exercise
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exercises.map((exercise) => (
                <div key={exercise._id} className="bg-gray-50 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-200">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{exercise.name}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenModal(exercise)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(exercise._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{exercise.description}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Sets: {exercise.sets}</span>
                    <span>Reps: {exercise.reps}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {exercise.category}
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
        aria-labelledby="exercise-modal-title"
        aria-describedby="exercise-modal-description"
        className="flex items-center justify-center"
      >
        <Box className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {editMode ? 'Edit Exercise' : 'Add New Exercise'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Exercise Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={currentExercise.name}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={currentExercise.description}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sets">
                  Sets
                </label>
                <input
                  type="text"
                  id="sets"
                  name="sets"
                  value={currentExercise.sets}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="e.g. 3"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reps">
                  Reps
                </label>
                <input
                  type="text"
                  id="reps"
                  name="reps"
                  value={currentExercise.reps}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="e.g. 12"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={currentExercise.category}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
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
                {editMode ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default Exercise; 