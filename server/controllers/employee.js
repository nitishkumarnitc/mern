const Employee = require('./../model/employee');
const log = require('./../logger')
module.exports = {
    searchEmployees: function (req, res) {
        Employee.find(function (err, employees) {
            if (err) {
                console.log(err);
            } else {
                res.json(employees);
            }
        });
    },
    getEmployeeById: function (req, res) {
        let id = req.params.id;
        Employee.findById(id, function (err, todo) {
            res.json(todo);
        });
    },
    addEmployee: function (req, res) {
        let employee = new Employee(req.body);
        employee.save()
            .then(employee => {
                res.status(200).json({'employee': 'employee added successfully'});
            })
            .catch(err => {
                log.error('error ', err)
                res.status(400).send('adding new employee failed');
            });
    },
    updateEmployee: function (req, res) {
        Employee.findById(req.params.id, function (err, employee) {
            if (!employee)
                res.status(404).send('data not found');
            else
                employee.name = req.body.name;
            employee.dateOfBirth = req.body.dateOfBirth;
            employee.salary = req.body.salary;
            employee.skills = req.body.skills;
            employee.profile_image_url = req.body.profile_image_url;

            employee.save().then(employee => {
                res.json('employee updated');
            })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        });
    }
}