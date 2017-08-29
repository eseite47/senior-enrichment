import React, { Component } from 'react';
import axios from 'axios';

export default class SinglePlanet extends Component {
  constructor(){
    super();
    this.state = {
      campusName: '',
      allStudents: [],
      addStudentId: 0,
      removeStudentId: 0
    }
    this.changeCampus = this.changeCampus.bind(this);
    this.handleAddStudent = this.handleAddStudent.bind(this);
    this.handleRemoveStudent = this.handleRemoveStudent.bind(this);
    this.handleDeleteCampus = this.handleDeleteCampus.bind(this);
  }

  componentDidMount(){
    //console.log('props ', this.props)
    //const campusName = this.props.match.params.campus;
    axios.get('api/students')
    .then(res => res.data)
    .then(data => {
      this.setState({campusName: this.props.campus, allStudents: data})
    })
  }

  //Changes status with student to add/remove
  changeCampus(e){
    const name = e.target.name;
    this.setState({[name]: e.target.value})
  }

  //Add Student to Campus
  handleRemoveStudent(){
    axios.put(`api/students/${this.state.removeStudentId}`, {newCampus: null})
    .then(data =>{
      console.log('You are edited the campus of this student ', data)
    })
  }

  //Add Student to Campus
  handleAddStudent(){
    axios.put(`api/students/${this.state.addStudentId}`, {newCampus: this.state.campusName})
    .then(data =>{
      console.log('You are edited the campus of this student ', data)
    })
  }

  //Delete Campus
  handleDeleteCampus(e){
    e.preventDefault();
    console.log('I want to delete ', this.state)
    axios.delete(`/api/planets/${this.state.campusName}`, this.state.campusName)
    .then(console.log('Trying to find redirect'))
  }

  render(){
    //console.log('state ', this.state)
    const students = this.state.allStudents
    const campusName = this.state.campusName

    return(
      <div className="container">
        <div>
          <h4>Enroll a Student to {campusName}</h4>
            <form onSubmit={this.handleAddStudent}>
              <select name='addStudentId' onChange={this.changeCampus}>
                <option>Select Student</option>
                {students && students.map(function(student, i) {
                console.log(student.planet)
                if(!student.planet || student.planet.name !== campusName){
                return <option key={i} name="addStudentId" value={student.id}>{student.name}</option>
                }
                })}
              </select>
              <button className="btn btn-info" type="submit" >
                <span className="glyphicon glyphicon-ok"></span>
              </button>
            </form>
          <h4> Remove a Student from {campusName}</h4>
            <form onSubmit={this.handleRemoveStudent}>
              <select name='removeStudentId' onChange={this.changeCampus}>
                <option>Select Student</option>
              {students && students.map(function(student, i) {
                console.log(student.planet)
                if(student.planet && student.planet.name === campusName){
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
