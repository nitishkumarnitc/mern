import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header";
import AddEmployee from "./components/Employee/add-employee";
import EmployeeList from "./components/Employee/employees-list";
import EditEmployee from "./components/Employee/edit-employee";


class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Header/>
                    <Route path="/" exact component={EmployeeList}/>
                    <Route path="/edit/:id" component={EditEmployee}/>
                    <Route path="/add-employee" component={AddEmployee}/>
                </div>
            </Router>
        );
    }
}

export default App;