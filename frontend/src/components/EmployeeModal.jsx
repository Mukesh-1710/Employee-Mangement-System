import React, { useState, useEffect } from "react";
import { HiOutlineChevronLeft, HiOutlineCamera, HiOutlineUser, HiPencil, HiOutlineChevronDown } from "react-icons/hi";

const EmployeeModal = ({ isOpen, onClose, onSave, employee }) => {
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    department: "",
    designation: "",
    project: "",
    type: "Office",
    status: "Permanent",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        employeeId: employee.employeeId || "",
        department: employee.department || "",
        designation: employee.designation || "",
        project: employee.project || "",
        type: employee.type || "Office",
        status: employee.status || "Permanent",
      });
      if (employee.image) {
        setImagePreview(`http://localhost:8080/${employee.image}`);
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData({
        name: "",
        employeeId: "",
        department: "",
        designation: "",
        project: "",
        type: "Office",
        status: "Permanent",
      });
      setImagePreview(null);
    }
    setImageFile(null);
  }, [employee, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create FormData for submission
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    if (imageFile) {
      data.append("image", imageFile);
    }
    
    onSave(data);
  };

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
          {employee ? "Edit Employee" : "Add New Employee"}
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

      <form onSubmit={handleSubmit} className="w-full">
        {/* Image Upload Box */}
        <div className="mb-10">
          <div className="relative inline-block cursor-pointer group">
            <div className="w-[120px] h-[120px] rounded-2xl overflow-hidden border border-[#E5E7EB] flex items-center justify-center bg-white shadow-sm">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <HiOutlineCamera size={36} className="text-[#9CA3AF] group-hover:text-gray-600 transition-colors" />
              )}
            </div>
            
            {imagePreview && (
              <div className="absolute -bottom-2 -right-2 bg-[#007bff] w-9 h-9 rounded-full flex items-center justify-center border-[3px] border-white cursor-pointer hover:bg-blue-600 transition-colors z-30 shadow-sm">
                <HiPencil className="text-white" size={16} />
              </div>
            )}
            
            <input 
              id="image-upload" 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className="absolute inset-0 opacity-0 cursor-pointer z-40" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Name */}
          <div>
            <label className="block text-[15px] font-bold text-[#111827] mb-2.5">Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
              className="w-full rounded-lg border border-[#E5E7EB] py-3 px-4 outline-none focus:border-[#007bff] focus:ring-1 focus:ring-[#007bff] transition-all text-[#111827] text-[15px] bg-white placeholder-gray-400"
            />
          </div>

          {/* Employee ID */}
          <div>
            <label className="block text-[15px] font-bold text-[#111827] mb-2.5">Employee ID*</label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="Enter employee ID"
              required
              className="w-full rounded-lg border border-[#E5E7EB] py-3 px-4 outline-none focus:border-[#007bff] focus:ring-1 focus:ring-[#007bff] transition-all text-[#111827] text-[15px] bg-white placeholder-gray-400"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-[15px] font-bold text-[#111827] mb-2.5">Department*</label>
            <div className="relative">
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-[#E5E7EB] py-3 pl-4 pr-10 outline-none focus:border-[#007bff] focus:ring-1 focus:ring-[#007bff] transition-all text-[#111827] text-[15px] appearance-none bg-white cursor-pointer"
              >
                <option value="" disabled className="text-gray-400 hidden">Select Department</option>
                <option value="Design">Design</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
              </select>
              <HiOutlineChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-[15px] font-bold text-[#111827] mb-2.5">Designation*</label>
            <div className="relative">
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-[#E5E7EB] py-3 pl-4 pr-10 outline-none focus:border-[#007bff] focus:ring-1 focus:ring-[#007bff] transition-all text-[#111827] text-[15px] appearance-none bg-white cursor-pointer"
              >
                <option value="" disabled className="text-gray-400 hidden">Select designation</option>
                <option value="Design Lead">Design Lead</option>
                <option value="Senior Developer">Senior Developer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Specialist">Specialist</option>
              </select>
              <HiOutlineChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Project */}
          <div>
            <label className="block text-[15px] font-bold text-[#111827] mb-2.5">Project</label>
            <input
              type="text"
              name="project"
              value={formData.project}
              onChange={handleChange}
              placeholder="Enter Project"
              className="w-full rounded-lg border border-[#E5E7EB] py-3 px-4 outline-none focus:border-[#007bff] focus:ring-1 focus:ring-[#007bff] transition-all text-[#111827] text-[15px] bg-white placeholder-gray-400"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-[15px] font-bold text-[#111827] mb-2.5">Type*</label>
            <div className="relative">
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-[#E5E7EB] py-3 pl-4 pr-10 outline-none focus:border-[#007bff] focus:ring-1 focus:ring-[#007bff] transition-all text-[#111827] text-[15px] appearance-none bg-white cursor-pointer"
              >
                <option value="" disabled className="text-gray-400 hidden">Select Type</option>
                <option value="Office">Office</option>
                <option value="Remote">Remote</option>
              </select>
              <HiOutlineChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-[15px] font-bold text-[#111827] mb-2.5">Status*</label>
            <div className="relative">
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-[#E5E7EB] py-3 pl-4 pr-10 outline-none focus:border-[#007bff] focus:ring-1 focus:ring-[#007bff] transition-all text-[#111827] text-[15px] appearance-none bg-white cursor-pointer"
              >
                <option value="" disabled className="text-gray-400 hidden">Select Status</option>
                <option value="Permanent">Permanent</option>
                <option value="Contract">Contract</option>
                <option value="Intern">Intern</option>
              </select>
              <HiOutlineChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 sm:gap-5 mt-12 sm:mt-16 pb-12">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-10 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#111827] font-bold hover:bg-gray-50 transition-all font-inter text-[15px] active:scale-95"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-10 py-3 rounded-xl bg-[#007bff] text-white font-bold hover:bg-blue-600 transition-all shadow-md active:scale-95 font-inter text-[15px]"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeModal;
