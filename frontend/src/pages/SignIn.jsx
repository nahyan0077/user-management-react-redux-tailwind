import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidationSchema } from "../FormValidation/loginValidationSchema";
import axios from "../axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/features/userSlice";
import Alert from "../components/Alert";
import LoadingScreen from "../components/Loading";


function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false)

  const initialValues = {
    email: "",
    password: "",
  };
  const handleSubmit = async (loginData) => {
    try {
      const response = await axios.post("/login", loginData);
      console.log("hewedf", response);
      if (response.data.success) {
        setLoading(true)
        const userDataResponse = await axios.get("/fetch-user-data");
        console.log("fetch", userDataResponse.data);
        dispatch(setUserData(userDataResponse.data));
        navigate("/");
        setLoading(false)
      
      } else if (response.data.emailError) {
        setEmailError(response.data.emailError);
      } else if (response.data.passwordError) {
        setPasswordError(response.data.passwordError);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="max-w-md w-full p-6 bg-gray-900 rounded-lg shadow-md  shadow-blue-800/40 h-full">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
      { loading && <LoadingScreen/> }
      {emailError && <Alert severity="error">{emailError}</Alert>}
      {passwordError && <Alert severity="error">{passwordError}</Alert>}
      <br />
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400"
            >
              Username:
            </label>
            <Field
              type="text"
              id="email"
              name="email"
              required
              className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:outline-none border-blue-800 focus:border-blue-100 bg-gray-800 text-gray-200"
            />
            <ErrorMessage
              name="email"
              component="small"
              style={{ color: "red" }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400"
            >
              Password:
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:outline-none border-blue-800 focus:border-blue-100 bg-gray-800 text-gray-200"
            />
            <ErrorMessage
              name="password"
              component="small"
              style={{ color: "red" }}
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </Form>
      </Formik>
      <div className="flex justify-center">
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
}

export default SignIn;
