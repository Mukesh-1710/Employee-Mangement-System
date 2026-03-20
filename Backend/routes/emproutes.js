import express from "express";
import { checkEmployeeExists } from "../middleware/empmiddleware.js";
import { validateEmployee } from "../middleware/validationmiddleware.js";
import upload from "../middleware/upload.js";

import {
    createEmployee, deleteEmployeeById, getEmployee,
    getEmployeeById,
    updateEmployee
} from "../controllers/empcontroller.js";

const router = express.Router();

router.post("/", upload.single("image"), validateEmployee, createEmployee);
router.get("/", getEmployee);
router.get("/:id", checkEmployeeExists, getEmployeeById)
router.put("/:id", checkEmployeeExists, upload.single("image"), validateEmployee, updateEmployee);
router.delete("/:id", checkEmployeeExists, deleteEmployeeById);

export default router;