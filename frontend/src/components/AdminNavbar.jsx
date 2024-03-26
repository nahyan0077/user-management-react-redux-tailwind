import { useDispatch } from "react-redux";
import axios from "../axios";
import React, { useRef, useState } from "react";
import { setUserData } from "../redux/features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { Confirm } from 'react-admin';



function AdminNavbar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const logout = () => {
        try {
            axios.get("/logout").then(() => {

              dispatch(setUserData(null));
              navigate("/signin");
            })
            .catch((error) => {
                console.error("Logout error:", error);
            });
        } catch (error) {
            console.log(error);
        }
        };


  return (
    <nav className="bg-black shadow-lg position: sticky top-0">
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
            <span className="text-white font-bold">ADMIN</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to='/admin-home'
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
                to="/admin-dash"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <a
                href="#"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </a>


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

export default AdminNavbar;
