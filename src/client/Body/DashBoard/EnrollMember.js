import React, { use, useState } from "react";
import { db } from "./firebase"; // Assuming your Firebase setup is already correctly initialized
import { collection, addDoc } from "firebase/firestore"; // Modular SDK imports
import "./EnrollMember.css"; // Import specific CSS
import axios from "axios";
import { Box, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Form, Formik } from "formik";
import {
  BasicSelect,
  BasicTextFields,
  dataRequired,
  DatePickerInput,
  getNextInstallmentDate,
  TimePickerInput,
  validatePhone,
} from "../allFields";

function EnrollMember() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("");
  const [feePaid, setFeePaid] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [alreadyMember, setAlreadyMember] = useState("No");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gymGoal, setGymGoal] = useState("");
  const [workOutTime, setWorkoutTime] = useState("");
  const [dateofJoining, setDateofJoining] = useState("");
  const [showInputError, setShowInpurError] = useState(false);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const nextPaymentDate = new Date();
  nextPaymentDate.setMonth(
    nextPaymentDate.getMonth() + (subscriptionType === "Monthly" ? 1 : 2)
  );

  const handleSubmit = () => {
    if (
      !name ||
      !phone ||
      !gender ||
      !subscriptionType ||
      !feePaid ||
      !paymentStatus ||
      !alreadyMember ||
      !age ||
      !address ||
      !city ||
      !weight ||
      !height ||
      !gymGoal ||
      !workOutTime ||
      !dateofJoining
    ) {
      toast.warn("Fill all details", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setShowInpurError(true)
    } else {
      setShowInpurError(false)
      handleOpen();
    }
  };

  const handleConfirmSave = async () => {
    const data = {
      name: name,
      phone: phone,
      gender: gender,
      subscriptionType: subscriptionType,
      feePaid: feePaid,
      dateOfJoining: new Date(dateofJoining)
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-"),
      nextPaymentDate: getNextInstallmentDate(subscriptionType, dateofJoining),
      alreadyMember: alreadyMember,
      lastPaymentDate: new Date(dateofJoining)
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-"),
      paymentStatus: paymentStatus,
      age:age,
      address:address,
      city:city,
      weight:weight,
      height:height,
      fitnessGoal:gymGoal,
      workOutTime:workOutTime,
    };

    axios
      .post("http://localhost:8000/createGymUser", data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div className="w-full min-h-screen bg-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-3xl font-bold text-yellow-500 mb-6">Register New Gym Member</h2> 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BasicTextFields
              label={"Name"}
              setData={setName}
              value={name}
              placeholder={"Enter the name"}
              validation={showInputError}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <BasicTextFields
                label={"Age"}
                setData={setAge}
                value={age}
                placeholder={"Enter the age"}
                validation={showInputError}
              />
              <BasicTextFields
                label={"Phone Number"}
                setData={setPhone}
                value={phone}
                placeholder={"Enter the phone number"}
                validation={showInputError}
              />
            </div>

            <BasicTextFields
              label={"Address"}
              setData={setAddress}
              value={address}
              placeholder={"Enter Address"}
              validation={showInputError}
            />

            <div className="grid grid-cols-2 gap-4">
              <BasicTextFields
                label={"City"}
                setData={setCity}
                value={city}
                placeholder={"Enter the city"}
                validation={showInputError}
              />
              <BasicTextFields
                label={"Weight"}
                setData={setWeight}
                value={weight}
                placeholder={"Enter the weight of client"}
                validation={showInputError}
              />
            </div>

            <BasicTextFields
              label={"Height"}
              setData={setHeight}
              value={height}
              placeholder={"Enter the height of client"}
              validation={showInputError}
            />

            <BasicTextFields
              label={"Amount Paid"}
              placeholder={"Enter the amount paid"}
              setData={setFeePaid}
              value={feePaid}
              validation={showInputError}
            />

            <BasicSelect
              label={"Gender"}
              listArray={["Male", "Female"]}
              placeholder={"Select the gender"}
              setData={setGender}
              value={gender}
              validation={showInputError}
            />

            <BasicSelect
              validation={showInputError}
              label={"Subscription Type"}
              listArray={[
                "Monthly",
                "2 Months",
                "Quarterly",
                "Half Yearly",
                "Yearly",
              ]}
              placeholder={"Subscription Type"}
              setData={setSubscriptionType}
              value={subscriptionType}
            />

            <BasicSelect
              validation={showInputError}
              label={"Payment Status"}
              listArray={["Completed", "Pending"]}
              placeholder={"Payment Status"}
              setData={setPaymentStatus}
              value={paymentStatus}
            />

            <BasicSelect
              validation={showInputError}
              label={"Already Member?"}
              listArray={["Yes", "No"]}
              placeholder={"Already Member?"}
              setData={setAlreadyMember}
              value={alreadyMember}
            />

            <BasicTextFields
              label={"Fitness Goal"}
              setData={setGymGoal}
              value={gymGoal}
              placeholder={"What is your fitness goal?"}
              validation={showInputError}
            />

            <div className="grid grid-cols-2 gap-4">
              <DatePickerInput 
                setData={setDateofJoining} 
                label="Date of Joining" 
                value={dateofJoining} 
                validation={showInputError}
              />
              <TimePickerInput 
                setData={setWorkoutTime} 
                label="Workout Timing" 
                value={workOutTime} 
                validation={showInputError}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition duration-200"
            >
              Save Member
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center"
      >
        <Box className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Member Registration</h3>
          <p className="text-gray-600 mb-6">Are you sure you want to add this member?</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200"
            >
              No, Cancel
            </button>
            <button
              onClick={handleConfirmSave}
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition duration-200"
            >
              Yes, Save
            </button>
          </div>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default EnrollMember;
