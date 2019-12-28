import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import APP_CONSTANTS from '../../constants'

const Employee = props => (
    <tr>
        <td className={props.employee.completed ? 'completed' : ''}>{props.employee.name}</td>
        <td className={props.employee.completed ? 'completed' : ''}>{props.employee.dateOfBirth}</td>
        <td className={props.employee.completed ? 'completed' : ''}>{props.employee.salary}</td>
        <td>
            <Link to={"/edit/" + props.employee._id}>Edit</Link>
        </td>
    </tr>
)

export default class EmployeeList extends Component {

    constructor(props) {
        super(props);
        this.state = {employees: []};
    }

    componentDidMount() {
        axios.get(APP_CONSTANTS.SERVER_URL + '/employees/')
            .then(response => {
                this.setState({employees: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    employeesList() {
        return this.state.employees.map(function (employee, i) {
            return <Employee employee={employee} key={i}/>;
        });
    }

    render() {
        return (
            <div>
                <h3>Employees List</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date Of Birth</th>
                        <th>Salary</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.employeesList()}
                    </tbody>
                </table>
            </div>
        )
    }
}