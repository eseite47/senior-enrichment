import React, { Component } from 'react';
import axios from 'axios';
import store from '../store'
import {fetchStudents} from '../reducers/index'

export default class EditCampus extends Component {
  constructor(){
    super();
    this.storeState = store.getState()
    this.state = {
      campusName: "",
      addStudentId: 0,
      removeStudentId: 0
    }
    this.changeCampus = this.changeCampus.bind(this);
    // this.submitCampusChange = this.submitCampusChange.bind(this)
    this.handleAddStudent = this.handleAddStudent.bind(this);
    this.handleRemoveStudent = this.handleRemoveStudent.bind(this);
    this.handleDeleteCampus = this.handleDeleteCampus.bind(this);
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => this.storeState = store.getState())
    //console.log('props ', this.props)
    //const campusName = this.props.match.params.campus;
    const studentsList = fetchStudents()
    store.dispatch(studentsList)

    // axios.get('api/students')
    // .then(res => res.data)
    // .then(data => {
    //   this.setState({campusName: this.props.campus, allStudents: data})
    // })
  }
  componentWillUnmount(){
    this.unsubscribe()
  }

  //Changes status with student to add/remove
  changeCampus(e){
    const name = e.target.name;
    console.log('value ', e.target.value, 'name ', name)
    this.setState({[name]: e.target.value})
  }

  //Add Student to Campus
  handleRemoveStudent(e){
    axios.put(`api/students/${this.state.removeStudentId}`, {newCampus: null})
    .then(data =>{
      console.log('You are edited the campus of this student ', data)
    })
  }

  //Add Student to Campus
  handleAddStudent(e){
    axios.put(`api/students/${this.state.addStudentId}`, {newCampus: this.storeState.currentCampus})
    .then(data =>{
      console.log('You have edited the campus of this student ', data)
    })
  }

  //Delete Campus
  handleDeleteCampus(e){
    console.log('I want to delete ', this.state)
    axios.delete(`/api/planets/${this.state.campusName}`, this.state.campusName)
    .then(console.log('Trying to find redirect'))
  }

  render(){

    console.log('state ', this.state)
    let students;
    let currentCampus;
    if(this.storeState){
      students = this.storeState.allstudents
      currentCampus = this.storeState.currentCampus
      console.log()
    }

    return(
      <div className="container">
        <div>
          <h4>Enroll a Student to {currentCampus}</h4>
            <form onSubmit={this.handleAddStudent}>
              <select name='addStudentId' onChange={this.changeCampus}>
                <option>Select Student</option>
                {students && students.map(function(student, i) {
                //console.log(student.planet)
                if (!student.planet || student.planet.name !== currentCampus){
                return <option key={i} name="addStudentId" value={student.id}>{student.name}</option>
                }
                })}
              </select>
              <button className="btn btn-info" type="submit" >
                <span className="glyphicon glyphicon-ok"></span>
              </button>
            </form>
          <h4> Remove a Student from {currentCampus}</h4>
            <form onSubmit={this.handleRemoveStudent}>
              <select name='removeStudentId' onChange={this.changeCampus}>
                <option>Select Student</option>
              {students && students.map(function(student, i) {
                //console.log(student.planet)
                if(student.planet && student.planet.name === currentCampus){
                return <option key={i} value={student.id}>{student.name}</option>
                }
                })
              }
              </select>
              <button className="btn btn-warning" type="submit" >
                <span className="glyphicon glyphicon-ok"></span>
              </button>
            </form>
          <form onSubmit={this.handleDeleteCampus}>
            <button className="btn btn-danger" type="submit" >
              <span className="glyphicon glyphicon-minus"></span> Remove Campus
            </button>
          </form>
        </div>
      </div>
    )
  }
}
