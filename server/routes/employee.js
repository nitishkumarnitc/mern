const express = require('express');
const emploeesController = require('./../controllers/employee')

const employeeRoutes = express.Router();
employeeRoutes.route('/').get(emploeesController.searchEmployees);

employeeRoutes.route('/:id').get(emploeesController.getEmployeeById);

employeeRoutes.route('/add').post(emploeesController.addEmployee);

employeeRoutes.route('/update/:id').post(emploeesController.updateEmployee);

module.exports = employeeRoutes;