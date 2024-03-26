import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import React, { useState }  from "react";
import { setUserData } from "../redux/features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { Confirm } from 'react-admin';




function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const [open, setOpen] = useState(false);

  const logout = () => {


    axios.get("/logout")
      .then(() => {
        dispatch(setUserData(null));
        navigate("/signin");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });

 

  };

  return (
    <nav className="bg-gray-800 shadow-lg position: sticky top-0">   
      <Confirm 
        className="0"
        isOpen={open}
        title={`Confirmation` }
        content="Are you sure you want to logout?"
        onClose={()=>setOpen(false)}
        onConfirm={logout}
        cancel="Cancel"
        confirm="Yes"
        confirmColor="warning"
      />

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-white font-bold">Welcome</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/home"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <a
                href="#"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </a>
              <Link
                to="/profile"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Edit Profile
              </Link>
              <Link
                to="/Security"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Security
              </Link>
              {userData && (
                <span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-bold uppercase cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                  {userData.name.toUpperCase()}
                </span>
              )}

              <button
                onClick={()=>setOpen(true)}
                className="text-black text-sm bg-gray-500 hover:bg-red-600 rounded-lg px-4 py-2 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
