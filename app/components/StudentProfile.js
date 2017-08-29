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
    //console.log(studentId)
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
        {planet && <Link to={`/campuses/${planet.name}`}>{planet.name} Campus</Link> || <p>Not Enrolled at a Campus</p>}
      </div>
      <div className="col-lg-4">
        <EditStudentProfile student={student} />
      </div>
    </div>)
  }
}
