import React from "react";
import SageLogo from "../assets/sage-logo.png";

const ExIphoneLogo = () => {
  return (
    <div className="flex justify-center items-center">
      <img 
        src={SageLogo} 
        alt="ex.iphones. logo" 
        className="w-48 h-auto"  // Adjust width (w-48) as needed
      />
    </div>
  );
};

export default ExIphoneLogo;
