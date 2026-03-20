import { DataTypes } from "sequelize";
import Sequelize from "../config/db.js";

const Employee = Sequelize.define("Employee", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },

    department: {
        type: DataTypes.STRING,
        allowNull: false
    },

    designation: {
        type: DataTypes.STRING,
        allowNull: false
    },

    project: {
        type: DataTypes.STRING
    },

    type: {
        type: DataTypes.ENUM("Office", "Remote"),
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM("Permanent", "Contract", "Intern"),
        allowNull: false
    },

    image: {
        type: DataTypes.STRING
    }

}, {
    timestamps: true
});

export default Employee;