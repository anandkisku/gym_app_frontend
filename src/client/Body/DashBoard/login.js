import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { dataRequired, TextInputTwo, validatePassword } from "../allFields";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const API_URL = "http://localhost:8000";

const handleLogin = async (values, navigate, setIsAuthenticated) => {
  const { username, password } = values;
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { username, password },
      { withCredentials: true }
    );
    
    if (response.status === 200) {
      setIsAuthenticated(true);
      toast.success("Login Successful", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    }
  } catch (error) {
    toast.error("Invalid credentials", {
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

function LoginForm({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
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
    <div id="mainLogin" className="min-w-full min-h-screen flex bg-gray-900">
      {/* Left side with animated text */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center w-full max-w-2xl"
        >
          <motion.h1 
            className="text-7xl text-yellow-500 font-bold text-white mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Your Gym Manager
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

      {/* Right side with login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-2xl p-12">
          <h2 className="text-4xl font-bold text-yellow-500 text-center mb-12">Login</h2>
          <Formik
            initialValues={{
              username: user.username,
              password: user.password,
            }}
            onSubmit={(values) => {
              handleLogin(values, navigate, setIsAuthenticated);
            }}
          >
            {({ errors, touched }) => (
              <Form className="space-y-8">
                <div className="space-y-6">
                  <div>
                    <TextInputTwo
                      name={"username"}
                      type={"text"}
                      validation={dataRequired}
                      errors={errors}
                      touched={touched}
                      label={"User Name"}
                      className="w-full h-14 px-6 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                    />
                  </div>
                  <div>
                    <TextInputTwo
                      name={"password"}
                      type={"password"}
                      validation={validatePassword}
                      errors={errors}
                      touched={touched}
                      label={"Password"}
                      className="w-full h-14 px-6 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-yellow-500 text-white text-xl font-semibold rounded-lg hover:bg-yellow-400 transition duration-200"
                  >
                    Login
                  </button>
                  <Link to={"/register"} className="block w-full">
                    <button
                      type="button"
                      className="w-full py-4 bg-gray-700 text-white text-xl font-semibold rounded-lg hover:bg-gray-600 transition duration-200"
                    >
                      Register
                    </button>
                  </Link>
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

export default LoginForm;
