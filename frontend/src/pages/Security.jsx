import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { resetPasswordValidationSchema } from '../FormValidation/resetPasswordValidation';
import axios from '../axios'
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';



function Security() {

    const fetchUserData = useSelector((state) => state.user.userData);
    console.log(fetchUserData,"kljgki");
    const [ error, setError ] = useState(false)
    const [ success, setSuccess ] = useState(false)

    const resetPassword = async (values, { resetForm }) => {
        try {
            
            const response = await axios.post('/reset-password',{...values, email : fetchUserData.email})
            console.log(response,"tressss");
            if(response.data.success){
              setSuccess(true)
              setTimeout(() => {
                setSuccess(false)
              }, 3000);
                resetForm()
            }else if (response.data.error) {
              setError(true)
              setTimeout(() => {
                setError(false)
              }, 3000);
            }
        } catch (error) {
            console.log("reset Password error",error);
        }
    }

  return (
    <div>
        <Navbar/>
        <div className="bg-gray-900 w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931] ">
        <main className="w-full min-h-screen py-1 flex justify-center ml-72 ">
          <div className="max-w-4xl w-full p-2 md:p-4">
            <div className="w-full px-6 pb-8 mt-20 sm:max-w-xl sm:rounded-lg">
              <h2 className="pl-6 text-2xl font-bold  text-white">
                Reset Password
              </h2>
              <div className="grid max-w-2xl mx-auto ">
                
                <div className="items-center  text-[#202142]">
                    <br />
                { success && <Alert variant="outlined" severity="success" > Pasword reset successfully </Alert> }
                { error && <Alert variant="outlined" severity="error" > Current password doesn't match </Alert> }
                <br />
                <Formik
                    initialValues={{
                        currentpassword : '',
                        password : '',
                        cpassword : ''
                    }}
                    validationSchema={resetPasswordValidationSchema}
                    onSubmit={resetPassword}
                >
           
                <Form >
                  <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div className="w-full">
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-gray-400"
                        
                      >
                        Current Pasword
                      </label>
                      <Field
                        type="password"
                        id="currentpassword"
                        name="currentpassword"
                        className="bg-gray-800 border border-indigo-300 text-gray-400 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        placeholder="Current password"
                        required
                      />
                      <ErrorMessage name="currentpassword" component="small" style={{ color: 'red' }} />
                    </div>
                   
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-400"
                    >
                      New Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      id="email"
                      className="bg-gray-800 border border-indigo-300 text-gray-400 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      placeholder="New password"
                    />
                    <ErrorMessage name="password" component="small" style={{ color: 'red' }} />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-400"
                    >
                      Confirm Password
                    </label>
                    <Field
                      id="cpassword"
                      name="cpassword"
                      type="password"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-400 bg-gray-800 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Confirm password"
                    />
                    <ErrorMessage name="cpassword" component="small" style={{ color: 'red' }} />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    >
                      Update Password
                    </button>
                  </div>
                  </Form>
    
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
   
  )
}

export default Security