import React, { Component } from 'react';

export default class Navbar extends Component {

  render(){
    return ( <nav className="navbar navbar-default">
  <div className="container-fluid">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="#"><span aria-hidden="true"></span> Hamilton Academy</a>
    </div>
    </div>

    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        <li className="active"><a href="#">Campuses>
          <span className="sr-only">(current)
            </span></a></li>
        <li><a href="#">Students</a></li>
      </ul>
      </div>
    </nav>
)
  }
}
