import React, { useEffect, useState ,useRef } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "../axios";
import { editProfileValidationSchema } from "../FormValidation/editProfileSchema";
// import Alert from '@mui/material/Alert';
import { baseURL } from "../constants/Constants";
import { setUserData } from "../redux/features/userSlice";
import { Toast, Alert } from 'react-daisyui';


function Profiile() {
 

    const [ isEditted ,setIsEditted ] = useState(false)
    const [ isProfilePhotoUpdated, setProfilePhotoUpdate ] = useState(false)
    const [ isProfilePhotoDeleted, setProfilePhotoDelete ] = useState(false)

    const dispatch = useDispatch()
    const fetchUserData = useSelector((state) => state.user.userData);

    

    useEffect(() => {
        if (fetchUserData) {
            setUserData({
                username: fetchUserData.name,
                email: fetchUserData.email,
                bio: fetchUserData.bio
            });
            
        }
    }, [fetchUserData]); 


    const handleEditUserData = async (values) => {
        try {
            console.log("edit dattt",values);
            const editData = await axios.post('/edit-profile',values)

            const editUserData = await axios.get("/fetch-user-data");
            setUserData({
                username : editUserData.name,
                email : editUserData.email,
                bio : editUserData.bio
            })
            const userDataResponse = await axios.get("/fetch-user-data");
            dispatch(setUserData(userDataResponse.data));
            setIsEditted(true)
            setTimeout(() => {
              setIsEditted(false)
            }, 3000);
    
            
        } catch (error) {
            console.log("Edit user",error);
        }

    }

    const fileInputRef = useRef(null);

    const handleFileInputChange = async (event) => {
      const file = event.target.files[0];
      console.log("Selected file:", file);
      try {
          const formData = new FormData();
          formData.append("profile", file);
          const response = await axios.post('/upload-profile-photo',formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
          })
          if(response.data.success){
            setProfilePhotoUpdate(true)
            setTimeout(() => {
              setProfilePhotoUpdate(false)
            }, 3000);
            const userDataResponse = await axios.get("/fetch-user-data");
            dispatch(setUserData(userDataResponse.data));
      
          }
      } catch (error) {
          console.log("image upload error",error);
      }
    };
    
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleDeleteProfile = async () => {
        const deleteProfileImage = await axios.delete('/delete-profile-image')
        if(deleteProfileImage.data.success){
          setProfilePhotoDelete(true)
          setTimeout(() => {
            setProfilePhotoDelete(false)
          }, 5000);
          const userDataResponse = await axios.get("/fetch-user-data");
          dispatch(setUserData(userDataResponse.data));
        }
    }


  return (
    <div>
      <Navbar />

      <div className="bg-gray-900 w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931] ">
        <main className="w-full min-h-screen py-1 flex justify-center ml-72 ">
          <div className="max-w-4xl w-full p-2 md:p-4">
            <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
              <h2 className="pl-6 text-2xl font-bold sm:text-xl text-white">
                Public Profile
              </h2>
              <div className="grid max-w-2xl mx-auto mt-8">
              <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                  <img
                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                    src={baseURL+`/${fetchUserData.profile}`}
                    alt="Bordered avatar"
                  />
                  <div className="flex flex-col space-y-5 sm:ml-8">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileInputChange}
                      />
                    <button
                      type="button"
                      className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                      onClick={handleButtonClick}
                      >
                      Change picture
                    </button>
                    <button
                      type="button"
                      className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200"
                      onClick={() => handleDeleteProfile(fetchUserData._id) }
                      >
                      Delete picture
                    </button>
                  </div>
                </div>
                <div className="items-center mt-8 sm:mt-14 text-[#202142]">

                { isEditted && <Toast vertical={"top"} horizontal={"center"} ><Alert status="success" className="">Editted Successfully</Alert></Toast> }
                { isProfilePhotoUpdated && <Toast vertical={"top"} horizontal={"center"} ><Alert status="success" className="">Profile Picture updated</Alert></Toast> }
                { isProfilePhotoDeleted && <Toast vertical={"top"} horizontal={"center"} ><Alert status="success" className="">Profile Picture deleted</Alert></Toast> }

                <br />
                <Formik
                      initialValues={{
                          username: fetchUserData.name,
                          email : fetchUserData.email,
                          bio: fetchUserData.bio
                        }}
                        validationSchema={editProfileValidationSchema}
                        onSubmit={handleEditUserData}
                        >
           
                <Form >
                  <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div className="w-full">
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                        
                      >
                        Username
                      </label>
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        className="bg-gray-800 text-gray-100 border border-indigo-300  text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        placeholder="Your first name"
                        required
                      />
                      <ErrorMessage name="username" component="small" style={{ color: 'red' }} />
                    </div>
                   
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-800 text-gray-500 border border-indigo-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      placeholder="your.email@mail.com"
                      readOnly
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Bio
                    </label>
                    <Field
                      id="bio"
                      name="bio"
                      type="text"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-100 bg-gray-800 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Write your bio here..."
                    />
                    <ErrorMessage name="bio" component="small" style={{ color: 'red' }} />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    >
                      Save
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
  );
}

export default Profiile;
