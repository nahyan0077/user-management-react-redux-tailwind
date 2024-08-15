import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signUpValidationSchema } from "../FormValidation/signUpValidation";
import { Link, useNavigate } from "react-router-dom";
import axios from '../axios'
import Alert from '../components/Alert'
import {useDispatch} from 'react-redux'
import {setUserData} from '../redux/features/userSlice'
import LoadingScreen from "../components/Loading";



function SignUp() {

  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const initialValues = {
    username: "",
    email: "",
    password: "",
    cpassword: "",
  };
  

  const handleSubmit = async (userData) => {
    try {
      
      const response = await axios.post('/signup', userData);
      
      if (response.data.success) {
        setLoading(true)
        const userDataResponse = await axios.get('/fetch-user-data');
        dispatch(setUserData(userDataResponse.data));
        navigate('/signin');
        setTimeout(() => {
          setLoading(false)
        }, 2000);
      } else if (response.data.error) {
        setLoading(false)
        setError(response.data.error);
      }
    } catch (error) {
      setLoading(false)
      console.error('Error occurred while submitting:', error);
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900  flex-col">
      <h2 className="text-3xl font-extrabold pb-10" > USER MANAGEMENT </h2>
    <div className="max-w-md w-full p-6 bg-gray-900 rounded-lg shadow-md border border-gray-700">
      { loading && <LoadingScreen/> }
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign Up</h2>
      {error && <Alert severity="error">{error}</Alert>} 
      <br />
      <Formik
        initialValues={initialValues}
        validationSchema={signUpValidationSchema}
        onSubmit={handleSubmit}
      >
      <Form >
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-400"
          >
            Username:
          </label>
          <Field
            type="text"
            id="username"
            name="username"
            required
            className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:outline-none border-blue-800 focus:border-blue-100 bg-gray-800 text-gray-200"
          />
          <ErrorMessage name="username" component="small" style={{ color: 'red' }} />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-400"
          >
            Email:
          </label>
          <Field
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:outline-none border-blue-800 focus:border-blue-100 bg-gray-800 text-gray-200"
          />
          <ErrorMessage name="email" component="small" style={{ color: 'red' }} />
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
          <ErrorMessage name="password" component="small" style={{ color: 'red' }} />
        </div>
        <div className="mb-4">
          <label
            htmlFor="cpassword"
            className="block text-sm font-medium text-gray-400"
          >
            Confirm Password:
          </label>
          <Field
            type="password"
            id="cpassword"
            name="cpassword"
            required
            className="mt-1 px-3 py-2 w-full border rounded-md shadow-sm focus:outline-none border-blue-800 focus:border-blue-100 bg-gray-800 text-gray-200"
          />
          <ErrorMessage name="cpassword" component="small" style={{ color: 'red' }} />

        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </div>
      </Form>
      </Formik>
      <div className="flex justify-center">
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to={'/signin'} className="text-blue-500 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
    </div>
  );
}

export default SignUp;
