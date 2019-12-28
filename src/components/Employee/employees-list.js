import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import APP_CONSTANTS from '../../constants'
import Moment from 'moment';

const Employee = props => (

    <tr>
        <td className={props.employee.completed ? 'completed' : ''}>
            <img style={{height:"25px", width:"25px"}} src={APP_CONSTANTS.SERVER_URL+'/images/'+props.employee.profile_image_url}/>
        </td>
        <td className={props.employee.completed ? 'completed' : ''}>{props.employee.name}</td>
        <td className={props.employee.completed ? 'completed' : ''}>{Moment(props.employee.dateOfBirth).format('MM DD YYYY')}</td>
        <td className={props.employee.completed ? 'completed' : ''}>{props.employee.salary}</td>
        <td>
            <Link to={"/edit/" + props.employee._id}>Edit</Link>
        </td>
        <td>
            <a onClick={props.deleteEmployee(props.employee._id)}>Delete</a>
        </td>
    </tr>
)

export default class EmployeeList extends Component {

    constructor(props) {
        super(props);
        this.state = {employees: []};
    }

    deleteEmployee=(id)=>{
        var that=this;
        axios.delete(APP_CONSTANTS.SERVER_URL + '/employees/')
            .then(response => {
                that.getEmployees();
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    getEmployees=function(){
        axios.get(APP_CONSTANTS.SERVER_URL + '/employees/')
            .then(response => {
                this.setState({employees: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    componentDidMount() {
        this.getEmployees();
    }


    employeesList() {
        var that=this;
        return this.state.employees.map(function (employee, i) {
            return <Employee employee={employee} key={i} deleteEmployee={that.deleteEmployee} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Employees List</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Pic</th>
                        <th>Name</th>
                        <th>Date Of Birth</th>
                        <th>Salary</th>
                        <th>Action</th>
                        <th>Delete</th>
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