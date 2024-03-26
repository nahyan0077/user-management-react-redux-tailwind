import React from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { useNavigate } from "react-router-dom";

function AdmHome() {

  const navigate =  useNavigate()

  return (
    <div>
      <AdminNavbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-900 -mt-16 ">
        <div className="bg-gray-800 shadow-xl rounded-lg text-gray-100 pl-36 pr-36 pb-10">
          <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
            <img
              className="object-cover object-center h-32"
              src="./src/assets/adm_pro.jpg"
              alt="Mountain"
            />
          </div>

          <div className="text-center mt-4">
            <h2 className="font-semibold text-white text-2xl">
              WELCOME ADMIN
            </h2>
            <p className="text-gray-400">Admin Panel</p>
          </div>
         
          <div className="p-4 mx-8 mt-2">
            <button 
            className="w-1/2 mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-16 py-2 flex items-center justify-center"
            onClick={()=>navigate('/admin-dash')}
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdmHome;
