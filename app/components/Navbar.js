import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
    <nav className="navbar navbar-inverse bg-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar">Campuses</span>
            <span className="icon-bar">Students</span>
          </button>
          <Link className="navbar-brand" to="/">Margaret Hamilton Interplanetary Academy</Link>
          </div>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
           <ul className="nav navbar-nav">
            <li><Link to="/campuses">Campuses</Link></li>
            <li><Link to="/students">Students</Link></li>
            <li> <Link to="/AddCampus">Request a new Campus</Link></li>
            <li> <Link to="/AddStudent">Enroll a Student</Link></li>
          </ul>
        </div>
      </nav>
    )
  }

  export default Navbar;
