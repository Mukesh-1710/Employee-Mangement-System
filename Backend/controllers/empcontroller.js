import Employee from "../models/employee.js";

// create new Employee
export const createEmployee = async (req, res) =>{
    try {
        const imagepath = req.file ? req.file.path : null;
        const employee = await Employee.create({...req.body, image: imagepath});
        res.status(201).json(employee);
    } catch (error){
        res.status(500).json({error: error.message});
    };
}

// get all employee
export const getEmployee = async (req, res) => {
    const employee = await Employee.findAll();
    res.json(employee);
};

// get employee by Id
export const getEmployeeById = async(req, res) => {
    res.json(req.employee);
};

//update employee
export const updateEmployee = async(req, res) => {
    try {
        const updatedData = {...req.body};
        if(req.file){
            updatedData.image = req.file.path;
        }
        await req.employee.update(updatedData);
        res.json(req.employee);
    }
    catch (error){
        res.status(500).json({error: error.message});
    }
};

//delete employee
export const deleteEmployeeById = async(req, res) => {
    try{
        await req.employee.destroy();
        res.json({message: "Employee deleted successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};