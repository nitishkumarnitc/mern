import React from 'react';
import {Link} from "react-router-dom";

export default function Header() {
    return <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collpase nav-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link to="/" className="nav-link">Employees</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/add-employee" className="nav-link">Add Employee</Link>
                </li>
            </ul>
        </div>
    </nav>
}