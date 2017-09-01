import React, { Component } from 'react';
import axios from 'axios';
import store from '../store'
import {fetchStudents,
  deleteCampusThunk,
  editStudentCampusThunk} from '../reducers/index'

export default class EditCampus extends Component {
  constructor(){
    super();
    this.storeState = store.getState()
    this.state = {
      campusName: "", //handle campus change for students
      addStudentId: 0,
      removeStudentId: 0,
    }
    this.newState ={
    // placeholder to update campus
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddStudent = this.handleAddStudent.bind(this);
    this.handleRemoveStudent = this.handleRemoveStudent.bind(this);
    this.handleDeleteCampus = this.handleDeleteCampus.bind(this);
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => this.storeState = store.getState())
    const studentsList = fetchStudents()
    store.dispatch(studentsList)
    //this.setState({name: this.props.campus})
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  //Changes local state with student to add/remove
  handleChange(e){
    const name = e.target.name;
    console.log('value ', e.target.value, 'name ', name)
    this.setState({[name]: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    axios.put(`/api/planets/${this.storeState.currentCampus}`, this.newState)
    this.props.history.push('/campuses')
  }

  //Remove student from Campus
  handleRemoveStudent(e){
    e.preventDefault()
    const editCampusThunk = editStudentCampusThunk(this.state.removeStudentId, null, 'remove');
    store.dispatch(editCampusThunk)
  }

  //Add Student to Campus
  handleAddStudent(e){
    e.preventDefault()
    const editCampusThunk = editStudentCampusThunk(this.state.addStudentId, this.storeState.currentCampus, 'add')
    store.dispatch(editCampusThunk)
  }

  //Delete Campus
  handleDeleteCampus(e){
    const state = this.storeState
    console.log('props 64', state)
    const deleteCampus = deleteCampusThunk(state.currentCampus)
    store.dispatch(deleteCampus)
    this.props.history.push('/campuses')
  }

  render(){
    let students;
    let currentCampus;
    if(this.storeState){
      students = this.storeState.allstudents
      currentCampus = this.storeState.currentCampus
    }


    return(
      <div className="container">
        <h1>Edit Campus Name</h1>
        <div className='form col-lg-6'>
        <p> Please fill in both inputs </p>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <h4>New Campus Name</h4>
            <input
              className='form-control'
              type="text"
              name="name"
              placeholder="New Name"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <h4>Edit Campus Image</h4>
            <input
              className='form-control'
              type="text"
              name="imageURL"
              placeholder="Campus Image"
              onChange={this.handleChange}
              value={this.state.imageURL}
            />
          </div>
          <button type="submit disabled" className="btn btn-default">Submit
          </button>
        </form>
      </div>
        <div className="col-lg-6">
          <h4>Enroll a Student to {currentCampus}</h4>
            <form onSubmit={this.handleAddStudent}>
              <select name='addStudentId' onChange={this.handleChange}>
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
              <select name='removeStudentId' onChange={this.handleChange}>
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
