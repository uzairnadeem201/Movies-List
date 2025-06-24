import React from "react";
import NavBar from "../components/NavBar"; // adjust path as per your structure
import Footer from "../components/Footer";
import List from "../components/List";

const GetList: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Include the navbar at the top */}
     
      <List />
      
    </div>
  );
};

export default GetList;