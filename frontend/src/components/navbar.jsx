import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faUsers,
  faPlus,
  faHome,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import AuthModal from "./authModal";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const handleAuthSuccess = (token) => {
    setAuthToken(token);
    setIsLoggedIn(true);
  };
  const handleSignOut = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    alert("You have successfully signed out.");
    setIsModalOpen(false);
  };
  return (
    <div className="bg-[rgb(211,211,211)] decoration-black flex flex-col justify-between rounded w-[15%] h-screen text-center fixed ">
      <div className="font-black h-[10%] flex justify-center items-center text-xl ">
        <FontAwesomeIcon icon={faComments} className="mr-2" />
        {"  "}Blogs
      </div>
      <div className="h-[40%] flex flex-col justify-evenly items-center">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="text-black font-bold hover:text-white hover:bg-black hover:rounded-2xl hover:w-[90%] py-2 text-l"
        >
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          {"  "}Home
        </div>
        <div
          onClick={() => {
            navigate("/create");
          }}
          className="text-black font-bold hover:text-white hover:bg-black hover:rounded-2xl hover:w-[90%] py-2 text-l"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          {"  "}Create
        </div>
        <div className="text-black font-bold hover:text-white hover:bg-black hover:rounded-2xl hover:w-[90%] py-2 text-l">
          <FontAwesomeIcon icon={faUsers} className="mr-2" />
          {"  "}Authors
        </div>
        <div className="text-black font-bold hover:text-white hover:bg-black hover:rounded-2xl hover:w-[90%] py-2 text-l">
          <FontAwesomeIcon icon={faClock} className="mr-2" />
          {"  "}Search
        </div>
      </div>

      <div
        className="font-black h-[10%] flex justify-center items-center text-l hover:text-xl cursor-pointer"
        onClick={() => {
          if (isLoggedIn || localStorage.getItem("authToken")) {
            handleSignOut();
          } else {
            setIsModalOpen(true);
          }
        }}
      >
        {isLoggedIn || localStorage.getItem("authToken")
          ? "Sign Out"
          : "Sign In"}
      </div>

      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Navbar;
