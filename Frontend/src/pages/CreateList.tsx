import React from "react";
import NavBar from "../components/NavBar"; // adjust path as per your structure
import Footer from "../components/Footer";
import NewListForm from "../components/CreateList";

const CreateList: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Include the navbar at the top */}
      <NewListForm />
    </div>
  );
};

export default CreateList;
