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
    //console.log('22 state', this.state)
    // const thunk = fetchCampusFromStudent(studentId)
    // store.dispatch(thunk)
    //const studentId = this.props.match.params.studentid
    // axios.get(`/api/students/${studentId}`)
    // .then(res => res.data)
    // .then(data => {
    //   this.setState({student: data})
    // })
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

    // console.log('planet', planet)
    // console.log('40 student profile', student)
    // console.log('41 state', this.state)

    return(
    <div className='container'>
      <h1>{student && student.name}</h1>
      <div className="col-lg-4">
        {student && <img src={student.imageURL}></img> || <img src="http://www.havoca.org/wp-content/uploads/2016/03/icon-user-default-300x300.png"></img>}
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
