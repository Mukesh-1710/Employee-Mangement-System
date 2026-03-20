import React from 'react';
import { HiOutlineCog, HiOutlineBell } from 'react-icons/hi';

const Header = () => {
  return (
    <header className="h-24 bg-white border-b border-[#E5E7EB] flex items-center justify-between lg:justify-end px-6 lg:px-12 sticky top-0 z-10 w-full">
      {/* Mobile Logo */}
      <div className="lg:hidden flex items-center">
        <h1 className="text-2xl font-bold text-[#007bff] tracking-tight">RS-TECH</h1>
      </div>

      <div className="flex items-center gap-5">
        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#f8f9fa] text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-all">
          <HiOutlineCog size={24} />
        </button>
        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#f8f9fa] text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-all">
          <HiOutlineBell size={24} />
        </button>

        <div className="w-12 h-12 rounded-full overflow-hidden cursor-pointer bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
