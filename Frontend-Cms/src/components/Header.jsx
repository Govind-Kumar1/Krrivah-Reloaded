import React from "react";

const Header = () => {
  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm px-6 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Administraor Panel</h1>
      
      <div className="flex items-center space-x-4">
        {/* You can add buttons or icons here */}
        <button className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
          🔔
        </button>
        <button className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
          👤
        </button>
      </div>
    </header>
  );
};

export default Header;
