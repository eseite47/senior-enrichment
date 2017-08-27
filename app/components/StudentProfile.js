import React, { Component } from 'react';
import axios from 'axios'
import { Link, BrowserRouter } from 'react-router-dom';
import EditStudentProfile from './EditStudentProfile'

export default class StudentProfile extends Component {
  constructor(){
    super();
    this.state = {
      student: [],
      newCampus: 0
    }
  }

  componentWillMount(){
    const studentId = this.props.match.params.studentid
    axios.get(`/api/students/${studentId}`)
    .then(res => res.data)
    .then(data => {
      this.setState({student: data})
    })
  }

  render(){
    const student = this.state.student;
    const planet = student.planet
    // const planet = student.planet.name;
    console.log('This student is on this campus: ', planet)

    return(<div className='container'>

      <h1>{student.name}</h1>
      <div className="col-lg-4">
      {student.imageURL && <img src={student.imageURL}></img> || <img src="http://www.havoca.org/wp-content/uploads/2016/03/icon-user-default-300x300.png"></img>}
      </div>
      <div className="col-lg-4">
      {planet && <Link to={`/campuses/${planet.name}`}>{planet.name} Campus</Link> || <p>Not Enrolled at a Campus</p>}
      </div>
      <div className="col-lg-4">
      <EditStudentProfile student={this.state.student} />
      </div>
    </div>)
  }
}
