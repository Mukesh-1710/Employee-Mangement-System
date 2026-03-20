import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee, createEmployee, updateEmployee } from "../services/employeeService";
import { HiOutlineSearch, HiOutlineEye, HiOutlinePencil, HiOutlineTrash, HiOutlinePlusCircle } from "react-icons/hi";
import EmployeeModal from "../components/EmployeeModal";
import EmployeeView from "../components/EmployeeView";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewingEmployee, setViewingEmployee] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const IMAGE_BASE_URL = "http://localhost:8080/";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getEmployees();
      setEmployees(data || []);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const results = (employees || []).filter(emp =>
      emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId?.toString().includes(searchTerm)
    );
    setFilteredEmployees(results);
  }, [searchTerm, employees]);

  const confirmDelete = async () => {
    try {
      if (employeeToDelete) {
        await deleteEmployee(employeeToDelete);
        setEmployees(prev => prev.filter(emp => emp.id !== employeeToDelete));
      }
    } catch (error) {
      console.error("Delete operation failed:", error);
    } finally {
      setDeleteModalOpen(false);
      setEmployeeToDelete(null);
    }
  };

  const handleDelete = (id) => {
    setEmployeeToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleSaveEmployee = async (formData) => {
    try {
      if (selectedEmployee) {
        // Update
        const updated = await updateEmployee(selectedEmployee.id, formData);
        setEmployees(prev => prev.map(emp => emp.id === selectedEmployee.id ? { ...emp, ...formData } : emp));
      } else {
        // Create
        const created = await createEmployee(formData);
        // Refresh list to get the new ID from backend if needed, or just re-fetch
        fetchData();
      }
      setIsModalOpen(false);
      setSelectedEmployee(null);
    } catch (error) {
      console.error("Failed to save employee:", error);
      alert("Error saving employee data");
    }
  };

  const openAddModal = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  if (isModalOpen) {
    return (
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEmployee}
        employee={selectedEmployee}
      />
    );
  }

  if (viewingEmployee) {
    return (
      <EmployeeView
        employee={viewingEmployee}
        onClose={() => setViewingEmployee(null)}
      />
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 animate-in fade-in duration-300">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-8 w-full">
        <h1 className="text-2xl sm:text-[32px] font-bold text-[#111827] tracking-tight">Employee</h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <div className="relative group w-full sm:w-auto">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 focus-within:text-blue-500 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg py-2.5 pl-11 pr-4 w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-[15px] font-normal text-gray-700 placeholder-gray-400"
            />
          </div>

          <button
            onClick={openAddModal}
            className="w-full sm:w-auto bg-[#007bff] hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all font-medium text-[15px] active:scale-95"
          >
            <HiOutlinePlusCircle size={20} className="text-white" />
            <span>Add New Employee</span>
          </button>
        </div>
      </div>

      {/* Employee Table Card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden w-full relative">
        <div className="overflow-x-auto w-full max-w-full">
          {loading ? (
            <div className="py-32 text-center">
              <div className="inline-block w-10 h-10 border-4 border-blue-100 border-t-[#007bff] rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400 font-semibold">Fetching records...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-6 text-[15px] font-medium text-gray-500 whitespace-nowrap pl-6">Employee Name</th>
                  <th className="py-4 px-6 text-[15px] font-medium text-gray-500 whitespace-nowrap">Employee ID</th>
                  <th className="py-4 px-6 text-[15px] font-medium text-gray-500 whitespace-nowrap">Department</th>
                  <th className="py-4 px-6 text-[15px] font-medium text-gray-500 whitespace-nowrap">Designation</th>
                  <th className="py-4 px-6 text-[15px] font-medium text-gray-500 whitespace-nowrap">Project</th>
                  <th className="py-4 px-6 text-[15px] font-medium text-gray-500 whitespace-nowrap">Type</th>
                  <th className="py-4 px-6 text-[15px] font-medium text-gray-500 whitespace-nowrap">Status</th>
                  <th className="py-4 px-6 text-[15px] font-medium text-gray-500 whitespace-nowrap">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 bg-white">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                            <img
                              src={emp.image ? `${IMAGE_BASE_URL}${emp.image}` : `https://ui-avatars.com/api/?name=${emp.name}&background=random&color=fff`}
                              className="w-full h-full object-cover"
                              alt={emp.name}
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${emp.name}&background=random&color=fff`;
                              }}
                            />
                          </div>
                          <span className="text-[15px] text-[#111827] font-medium">{emp.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[15px] text-[#111827] font-normal">{emp.employeeId}</td>
                      <td className="py-4 px-6 text-[15px] text-[#111827] font-normal">{emp.department}</td>
                      <td className="py-4 px-6 text-[15px] text-[#111827] font-normal">{emp.designation || 'Design Lead'}</td>
                      <td className="py-4 px-6 text-[15px] text-[#111827] font-normal">{emp.project || 'Car Rental'}</td>
                      <td className="py-4 px-6 text-[15px] text-[#111827] font-normal">{emp.type || 'Office'}</td>
                      <td className="py-4 px-6 text-[15px] text-[#111827] font-normal">
                        {emp.status || 'Permanent'}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3 text-gray-600">
                          <button
                            onClick={() => setViewingEmployee(emp)}
                            className="hover:text-blue-600 transition-colors"
                            title="View"
                          >
                            <HiOutlineEye size={20} />
                          </button>
                          <button
                            onClick={() => openEditModal(emp)}
                            className="hover:text-blue-600 transition-colors"
                            title="Edit"
                          >
                            <HiOutlinePencil size={20} />
                          </button>
                          <button
                            onClick={() => handleDelete(emp.id)}
                            className="hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <HiOutlineTrash size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-40 text-center">
                      <p className="text-2xl font-bold text-gray-700">No records found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] w-full max-w-[340px] overflow-hidden shadow-2xl scale-100">
            <div className="p-8 pb-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full border-2 border-[#007bff] flex items-center justify-center mb-6">
                <HiOutlineTrash size={32} className="text-[#007bff]" />
              </div>
              <h3 className="text-[18px] font-bold text-[#111827] leading-snug">
                Are you sure you want<br />to Delete
              </h3>
            </div>
            <div className="flex w-full">
              <button
                onClick={() => { setDeleteModalOpen(false); setEmployeeToDelete(null); }}
                className="flex-1 py-4 bg-[#ff4d4f] text-white font-bold text-[15px] hover:bg-opacity-90 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-4 bg-[#007bff] text-white font-bold text-[15px] hover:bg-opacity-90 transition-colors"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;