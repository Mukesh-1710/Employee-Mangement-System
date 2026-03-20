import Employee from "../models/employee.js";

export const checkEmployeeExists = async (req, res, next) => {
    try{
        const employee = await Employee.findByPk(req.params.id);

        if(!employee) {
            return res.status(404).json({message: "Employee not found"});
        }
        req.employee = employee;

        next();
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};

