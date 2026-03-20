import React from 'react';
import { HiOutlineViewGrid, HiOutlineUser, HiOutlineCalendar, HiOutlineChatAlt } from 'react-icons/hi';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: HiOutlineViewGrid },
    { name: 'Employee', icon: HiOutlineUser, active: true },
    { name: 'Calendar', icon: HiOutlineCalendar },
    { name: 'Messages', icon: HiOutlineChatAlt },
  ];

  return (
    <aside className="hidden lg:flex w-64 min-w-[16rem] h-screen bg-white border-r border-[#E5E7EB] flex-col fixed left-0 top-0 z-20">
      <div className="pt-10 pb-12 pl-8">
        <h1 className="text-[28px] font-bold text-[#007bff] tracking-tight">
          RS-TECH
        </h1>
      </div>

      <nav className="flex-1 font-medium mt-2">
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href="#"
                className={`flex items-center gap-4 pl-8 py-3.5 pr-6 transition-all duration-200 ${item.active
                  ? 'bg-[#007bff] text-white rounded-r-full mr-6'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-[#007bff] rounded-r-full mr-6'
                  }`}
              >
                <item.icon size={24} className={item.active ? 'text-white' : 'text-gray-400'} />
                <span className="text-[15px]">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;