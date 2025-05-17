import React from "react";
import Bre from "../../images/Bre0.jpg";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex bg-white">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 ">
        <h2 className=" text-lg fold-medium text-gray-800">Task Manager</h2>
        {children}
      </div>

      <div className="hidden md:flex items-center justify-center w-[40vw] overflow-hidden">
        <img src= {Bre} className="w-64 lg:w-[90%]"/>
      </div>
    </div>
  );
};

export default AuthLayout;

