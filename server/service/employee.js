const Employee = require('./../model/employee');
const log = require('./../logger')

module.exports = {
    searchEmployees: function (employeeName) {
        return new Promise((resolve, reject) => {
            Employee.find(function (err, employees) {
                if (err) {
                    reject(err);
                } else {
                    resolve(employees)
                }
            });
        })

    },
    getEmployeeById: function (id) {
        return new Promise((resolve, reject) => {
            Employee.findById(id, function (err, todo) {
                if (err) reject(err)
                resolve(todo);
            });
        })
    },
    addEmployee: function (body) {
        return new Promise((resolve, reject) => {
            let employee = new Employee(body);
            employee.save()
                .then(employee => {
                    resolve(employee)
                })
                .catch(err => {
                    log.error('error ', err)
                    if (err.name == 'ValidationError') {
                        reject(err)
                    } else {
                        console.error(err);
                        reject(err)
                    }
                });
        })

    },
    updateEmployee: function (id, body) {
        return new Promise((resolve, reject) => {
            Employee.findById(id, function (err, employee) {
                if (!employee)
                    reject(err)
                else
                    employee.name = body.name;
                employee.dateOfBirth = body.dateOfBirth;
                employee.salary = body.salary;
                employee.skills = body.skills;
                employee.profile_image_url = body.profile_image_url;

                employee.save().then(employee => {
                    resolve(employee)
                })
                    .catch(err => {
                        log.error(err)
                        reject(err)
                    });
            });
        })

    }
}