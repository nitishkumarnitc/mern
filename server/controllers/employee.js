const EmployeeService = require('./../service/employee');
const log = require('./../logger')

module.exports = {
    searchEmployees: function (req, res) {
        EmployeeService.searchEmployees().then((employees) => {
            res.status(200).json(employees);
        }).catch((err) => {
            log.error(err)
            res.status()
        });
    },
    getEmployeeById: function (req, res) {
        let id = req.params.id;
        EmployeeService.getEmployeeById(id).then(todo => {
            res.json(todo);
        });
    },
    addEmployee: function (req, res) {
        EmployeeService.addEmployee(req.body).then(employee => {
            res.status(200).json({'employee': 'employee added successfully'});
        })
            .catch(err => {
                log.error('error ', err)
                if (err.name == 'ValidationError') {
                    res.status(422).json({"message": err.message});
                } else {
                    console.error(err);
                    res.status(500).json({"message": err.message});
                }
            });
    },
    updateEmployee: function (req, res) {
        EmployeeService.updateEmployee(req.params.id, req.body).then(employee => {
            res.json('employee updated');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    },
    deleteEmployee:function (req, res) {
        EmployeeService.deleteEmployee(req.params.id).then(() => {
            res.json('employee deleted');
        })
            .catch(err => {
                res.status(400).send("Delete not possible");
            });
    },
}