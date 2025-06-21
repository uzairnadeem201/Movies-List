// pages/Dashboard.tsx
import React from "react";
import NavBar from "../components/NavBar"; // adjust path as per your structure
import Footer from "../components/Footer";
import DashboardMain from "../components/Dashboard";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Include the navbar at the top */}
      <NavBar />
    <DashboardMain/>
      <Footer/>
    </div>
  );
};

export default Dashboard;
