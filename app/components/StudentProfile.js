import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import store from '../store'
import { setCurrentStudent, fetchOneStudent } from '../reducers/index'
import EditStudentProfile from './EditStudentProfile'

export default class StudentProfile extends Component {
  constructor(){
    super();
    this.state = store.getState();
  }

  componentDidMount(){
    const studentId = this.props.match.params.studentid
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))

    const thunk = fetchOneStudent(studentId)
    store.dispatch(thunk)
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  render(){
    const student = this.state.currentStudent;
    let planet;
    if(student) {
      planet = student.planet
    }

    return(
    <div className='container'>
      <h1>{student && student.name}</h1>
      <div className="col-lg-4">
        {student && <img src={student.imageURL}></img> }
      </div>
      <div className="col-lg-4">
        <h4>Campus</h4>
        {planet && <Link to={`/campuses/${planet.name}`}>{planet.name}</Link> || <p>Not Enrolled at a Campus</p>}
        <h4>Details</h4>
        <p>id: {student && student.id}</p>
        <p>email: {student && student.email}</p>
        <h4>bio</h4>
        <p>{student && student.bio}</p>
        <h4>Report Card</h4>
        <p>{student && student.reportCard}</p>
      </div>
      <div className="col-lg-4">
        <EditStudentProfile student={student} history={this.props.history}/>
      </div>
    </div>)
  }
}
