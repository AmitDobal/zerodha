"use client";
import React from "react";
import SideBar from "../_components/SideBar";

const Dashboard = () => {
  return (
    <div className="h-screen flex antialiased">
      <div className="w-4/12 md:w-4/12 lg:w-3/12 border">
        <SideBar />
      </div>
      <div className="w-10/12 bg-slate-400 p-1">
        <div className="h-1/2">portfolio</div>
        <div className="h-1/2">market charts</div>
      </div>
    </div>
  );
};

export default Dashboard;
