import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  dataRequired,
  TextInputTwo,
  validateEmail,
  validatePassword,
  validatePhone,
} from "../allFields";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const API_URL = "http://localhost:8000";

const handleRegister = async (values, navigate) => {
  const { username, password, name, phoneNumber, Address, gymName, email } =
    values;
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password,
      name,
      phoneNumber,
      Address,
      gymName,
      email,
    });
    if (response) {
      toast.success("Registration Successful", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Registration failed", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

const words = ["Register your gym and start managing your members efficiently", "Analyze your gym's growth with real-time insights and reports.", "Securely store and access your gym members' details anytime, anywhere", "Streamline operations and reduce paperwork with our digital solution"];

function RegisterOwner() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
    name: "",
    phoneNumber: "",
    Address: "",
    gymName: "",
    email: "",
  });

  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    const timeout = setTimeout(() => {
      setText(currentWord.substring(0, charIndex));
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);


  return (
    <div className="min-w-full min-h-screen flex bg-gray-900">
      {/* Left side with animated text */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center w-full max-w-2xl"
        >
          <motion.h1
            className="text-7xl font-bold text-yellow-500 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Join Your Gym Manager
          </motion.h1>
          <div className="h-24 flex items-center justify-center">
            <motion.p
              className="text-2xl text-yellow-600"
              key={text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {text}
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Right side with registration form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center lg:p-4">
        <div className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-2xl lg:p-8 sm:p-12">
          <h2 className="text-4xl font-bold text-yellow-500 text-center mb-12">Register Your Gym</h2>
          <Formik
            initialValues={{
              username: user.username,
              password: user.password,
              name: user.name,
              phoneNumber: user.phoneNumber,
              Address: user.Address,
              gymName: user.gymName,
              email: user.email,
            }}
            onSubmit={(values) => {
              handleRegister(values, navigate);
            }}
          >
            {({ errors, touched }) => (
              <Form className="space-y-2">
                <div className="space-y-3">
                  <TextInputTwo
                    name={"username"}
                    type={"text"}
                    validation={dataRequired}
                    errors={errors}
                    touched={touched}
                    label={"User Name"}
                    className="w-full h-14 px-6 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  />
                  <TextInputTwo
                    name={"password"}
                    type={"password"}
                    validation={validatePassword}
                    errors={errors}
                    touched={touched}
                    label={"Password"}
                    className="w-full h-14 px-6 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  />
                  <TextInputTwo
                    name={"name"}
                    type={"text"}
                    validation={dataRequired}
                    errors={errors}
                    touched={touched}
                    label={"Full Name"}
                    className="w-full h-14 px-6 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  />
                  <TextInputTwo
                    name={"phoneNumber"}
                    type={"text"}
                    validation={validatePhone}
                    errors={errors}
                    touched={touched}
                    label={"Phone Number"}
                    className="w-full h-14 px-6 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  />
                  <TextInputTwo
                    name={"email"}
                    type={"email"}
                    validation={validateEmail}
                    errors={errors}
                    touched={touched}
                    label={"Email"}
                    className="w-full h-14 px-6 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  />
                  <TextInputTwo
                    name={"gymName"}
                    type={"text"}
                    validation={dataRequired}
                    errors={errors}
                    touched={touched}
                    label={"Gym Name"}
                    className="w-full h-14 px-6 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  />
                  <TextInputTwo
                    name={"Address"}
                    type={"text"}
                    validation={dataRequired}
                    errors={errors}
                    touched={touched}
                    label={"Address"}
                    className="w-full h-14 px-6 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  />
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-yellow-500 text-white text-xl font-semibold rounded-lg hover:bg-yellow-400 transition duration-200"
                  >
                    Register Now
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="w-full py-4 bg-gray-700 text-white text-xl font-semibold rounded-lg hover:bg-gray-600 transition duration-200"
                  >
                    Back to Login
                  </button>
                </div>
                <ToastContainer />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default RegisterOwner;
