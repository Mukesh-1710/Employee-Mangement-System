export const validateEmployee = (req, res, next) =>{
    const {
        name,
        employeeId,
        department
    } = req.body;

    if(!name||!employeeId){
        return res.status(400).json({
            message: "Name and Employee ID are required"
        });
    }
    next();
}