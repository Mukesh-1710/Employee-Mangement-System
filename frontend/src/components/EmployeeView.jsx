import React from "react";
import { HiOutlineChevronLeft, HiOutlineUser } from "react-icons/hi";

const EmployeeView = ({ employee, onClose }) => {
  const IMAGE_BASE_URL = "http://localhost:8080/";

  if (!employee) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 animate-in fade-in duration-300 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-4 mb-8">
        <button
          onClick={onClose}
          className="text-[#111827] hover:bg-gray-100 p-2 -ml-2 rounded-lg transition-colors shrink-0"
        >
          <HiOutlineChevronLeft size={24} className="sm:w-7 sm:h-7" strokeWidth={2.5} />
        </button>
        <h1 className="text-2xl sm:text-[32px] font-bold text-[#111827] tracking-tight truncate">
          View Employee Details
        </h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#E5E7EB] mb-10">
        <div className="flex">
          <div className="flex items-center gap-2 pb-4 border-b-2 border-[#007bff] text-[#007bff] font-bold text-[15px]">
            <HiOutlineUser size={20} strokeWidth={2} />
            <span>Personal Information</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl">
        {/* Avatar Section */}
        <div className="mb-10">
          <div className="w-[100px] h-[100px] rounded-2xl overflow-hidden border border-[#E5E7EB] bg-white shadow-sm flex-shrink-0">
            <img
              src={employee.image ? `${IMAGE_BASE_URL}${employee.image}` : `https://ui-avatars.com/api/?name=${employee.name}&background=random&color=fff`}
              alt={employee.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${employee.name}&background=random&color=fff`;
              }}
            />
          </div>
        </div>

        {/* Data Grid Section */}
        <div className="border-t border-[#E5E7EB]">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 py-6 border-b border-[#E5E7EB]">
            <div>
              <p className="text-[13px] text-gray-500 mb-1.5 font-medium">Name</p>
              <p className="text-[15px] font-medium text-[#111827]">{employee.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-[13px] text-gray-500 mb-1.5 font-medium">Employee ID</p>
              <p className="text-[15px] font-medium text-[#111827]">{employee.employeeId || "N/A"}</p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 py-6 border-b border-[#E5E7EB]">
            <div>
              <p className="text-[13px] text-gray-500 mb-1.5 font-medium">Department</p>
              <p className="text-[15px] font-medium text-[#111827]">{employee.department || "N/A"}</p>
            </div>
            <div>
              <p className="text-[13px] text-gray-500 mb-1.5 font-medium">Designation</p>
              <p className="text-[15px] font-medium text-[#111827]">{employee.designation || "N/A"}</p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 py-6 border-b border-[#E5E7EB]">
            <div>
              <p className="text-[13px] text-gray-500 mb-1.5 font-medium">Project</p>
              <p className="text-[15px] font-medium text-[#111827]">{employee.project || "N/A"}</p>
            </div>
            <div>
              <p className="text-[13px] text-gray-500 mb-1.5 font-medium">Type</p>
              <p className="text-[15px] font-medium text-[#111827]">{employee.type || "Office"}</p>
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 py-6 border-b border-[#E5E7EB]">
            <div>
              <p className="text-[13px] text-gray-500 mb-1.5 font-medium">Status</p>
              <p className="text-[15px] font-medium text-[#111827]">{employee.status || "Permanent"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeView;
