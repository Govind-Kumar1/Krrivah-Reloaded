import React from "react";

const StatCard = ({ icon, value, title, subtitle }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 transition-transform hover:scale-105">
      {/* Icon Background */}
      <div className="bg-gray-100 p-4 rounded-full">
        {icon}
      </div>
      
      {/* Text Content */}
      <div>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        <p className="text-sm font-semibold text-gray-600 uppercase">{title}</p>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
};

export default StatCard;