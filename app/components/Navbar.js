import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render(){
    return ( <nav className="navbar navbar-inverse bg-inverse">
  <div className="container-fluid">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar">Campuses</span>
        <span className="icon-bar">Students</span>
      </button>
      <Link className="navbar-brand" to="/campuses">Hamilton Academy</Link>
    </div>
    </div>

    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        <li className="active"><Link to="/campuses">Campuses
          <span className="sr-only">(current)
            </span></Link></li>
        <li><Link to="/students">Students</Link></li>
      </ul>
      </div>
    </nav>
)
  }
}
