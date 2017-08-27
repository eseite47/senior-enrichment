import React, { Component } from 'react';
import axios from 'axios';

export default class SinglePlanet extends Component {
  constructor(){
    super();
    this.state = {
      campusName: '',
      allStudents: [],
      addStudentId: 0
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleCampusChange = this.handleCampusChange.bind(this)
    this.changeCampus = this.changeCampus.bind(this)
  }

  componentDidMount(){
    console.log('props ', this.props)
    //const campusName = this.props.match.params.campus;
    axios.get('api/students')
    .then(res => res.data)
    .then(data => {
      this.setState({campusName: this.props.campus, allStudents: data})
    })
  }

  handleCampusChange(){
    axios.put(`api/students/${this.state.addStudentId}`, {newCampus: this.state.campusName})
    .then(data =>{
      console.log('You are edited the campus of this student ', data)
    })
  }

  changeCampus(e){
    // const input = e.target.value;
    // console.log('input ', input)
    this.setState({addStudentId: e.target.value})
  }

  handleDelete(e){
    e.preventDefault();
    console.log('I want to delete ', this.state)
    axios.delete(`/api/planets/${this.state.campusName}`, this.state.campusName)
    .then(console.log('Trying to find redirect'))
  }

  render(){
    console.log('state ', this.state)
    const students = this.state.allStudents
    const campusName = this.state.campusName
    return(
      <div className="container">
      <div>
        <h4>Add Students to {campusName}</h4>
      <form onSubmit={this.handleCampusChange}>
      <select onChange={this.changeCampus}>
        <option>Select Student</option>
      {students && students.map(function(student, i) {
        console.log(student.planet)
         {/* if(student.planet.name !== campusName){ */}
        return <option key={i} value={student.id}>{student.name}</option>
      {/* } */}
      })}
      </select>
      <button className="btn btn-info" type="submit" >
            <span className="glyphicon glyphicon-ok"></span>
          </button>
      </form>
      <form onSubmit={this.handleDelete}>
      <button className="btn btn-danger" type="submit" >
            <span className="glyphicon glyphicon-minus"></span> Remove Campus
          </button>
          </form>
          </div>
      </div>
    )
  }
}
