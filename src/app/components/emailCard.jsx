// components/EmailCard.js
import React, { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { FaTimes } from "react-icons/fa"; // Import the "X" icon from react-icons

const EmailCard = ({ email, showClassifications }) => {
  const [isOpen, setIsOpen] = useState(false);
  function getCategoryColor(category) {
    switch (category) {
      case "Important":
        return "text-green-500"; // Tailwind CSS class for green
      case "Promotions":
        return "text-blue-500"; // Example color; you can choose any
      case "Social":
        return "text-purple-500"; // Example color; you can choose any
      case "Marketing":
        return "text-yellow-500"; // Tailwind CSS class for yellow
      case "Spam":
        return "text-red-500"; // Tailwind CSS class for red
      case "General":
        return "text-gray-500"; // Example color; you can choose any
      default:
        return "text-gray-500"; // Default color for undefined categories
    }
  }

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div
        className="relative w-full p-4 border border-gray-300 rounded-lg mb-4 cursor-pointer bg-white"
        onClick={toggleDrawer}
      >
        {/* Commented out category */}
        {showClassifications && (
          <div
            className={`absolute top-2 right-2 text-xs ${getCategoryColor(
              email.category
            )}`}
          >
            {email.category}
          </div>
        )}

        <div className="font-bold text-lg mb-2">{email.senderEmail}</div>
        <div className="truncate">
          {typeof email.snippet !== "object" ? email.snippet : ""}
        </div>
      </div>

      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        style={{ width: "50vw" }} // Set the width to 50% of the viewport width
        className="drawer-custom"
      >
        <div className="p-4 relative">
          {/* Close button */}
          <button
            onClick={toggleDrawer}
            className="absolute top-4 right-4 bg-gray-200 text-gray-600 p-1 rounded-full flex items-center justify-center"
            style={{ width: "32px", height: "32px" }} // Adjust button size
          >
            <FaTimes size={20} /> {/* "X" icon */}
          </button>

          {/* Commented out category */}
          {showClassifications && (
            <div
              className={`absolute top-4 right-16 text-xs ${getCategoryColor(
                email.category
              )}`}
            >
              {email.category}
            </div>
          )}

          <div className="font-bold text-lg mb-2">{email.senderEmail}</div>
          <div>{typeof email.snippet !== "object" ? email.snippet : ""}</div>
        </div>
      </Drawer>
    </div>
  );
};

export default EmailCard;
