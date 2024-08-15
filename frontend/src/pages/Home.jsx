import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { baseURL } from '../constants/Constants';
import { BsInstagram  } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { Toast, Alert } from 'react-daisyui';
import axios from '../axios'
import { setUserData } from '../redux/features/userSlice';


function Home() {

  const fetchUserData = useSelector((state) => state.user.userData);
  const [isFollow, setFollow] = useState(false)
  const dispatch = useDispatch()

  
  const handleFollow = () => {
    setFollow(true)
    setTimeout(() => {
      setFollow(false)
    }, 2000);
  }

  const handleClick = () => {
    dispatch(updateName())
    console.log("hello");
    
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-900 -mt-16">
      { isFollow && <Toast vertical={"top"} horizontal={"center"} ><Alert status="info" className="">Thank you for following</Alert></Toast> }
      <div className="bg-gray-800 shadow-xl rounded-lg text-gray-900 ">
      <div className="rounded-t-lg h-32 overflow-hidden">
        <img
          className="object-cover object-top w-full"
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          alt="Mountain"
        />
      </div>
      <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img
          className="object-cover object-center h-32"
          src={baseURL+`/public/${fetchUserData.profile}`}
         
        />
      </div>
      <div className="text-center mt-2">
        <h2 className="font-semibold text-white"> {fetchUserData.name.toUpperCase()} </h2>
       
        <p className="text-gray-400"> {fetchUserData.bio} </p>
      </div>
      <ul className="py-4 mt-2 text-gray-200 flex items-center justify-around">
        <li className="flex flex-col items-center justify-around">
        <BsInstagram  />

          <div>2k</div>
        </li>
        <li className="flex flex-col items-center justify-between">
        <FaGithub />
          <div>10k</div>
        </li>
        <li className="flex flex-col items-center justify-around">
        <FaLinkedin />
          <div>15k</div>
        </li>
      </ul>
      <div className="p-4 border-t mx-8 mt-2">
        <button 
        className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
        onClick={handleFollow}
        >
          Follow
        </button>
      </div>
    </div>
    </div>
    </>

  )
}

export default Home