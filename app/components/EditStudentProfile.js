import React, { Component } from 'react';
import axios from 'axios';

export default class EditStudentProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      campuses: [],
      newCampus: ''
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleCampusChange = this.handleCampusChange.bind(this)
    this.changeCampus = this.changeCampus.bind(this)
  }

  componentDidMount(){
    console.log('props ', this.props)
    //const campusName = this.props.match.params.campus;
    axios.get('api/planets')
    .then(res => res.data)
    .then(data => this.setState({student: this.props.student, campuses: data}))
  }
  //send server request for campus change
  handleCampusChange(){
    const student = this.props.student;
    axios.put(`/api/students/${student.id}`, {newCampus: this.state.newCampus})
    .then(console.log('request was sent'))
  }
  //change state
  changeCampus(e){
    const input = e.target.value
    console.log('35 input ', input)
    this.setState({newCampus: input})
    console.log(this.state)
  }

  handleDelete(e){
    e.preventDefault();
    console.log('I want to delete ', this.props.student)
    axios.delete(`/api/students/${this.props.student.id}`, this.props.student)
    .then(console.log('Trying to find redirect'))
  }


  render(){
    const student = this.props.student;
    console.log('Edit Profile 50 student ', student)
    console.log('Edit Profile 51 campuses', this.state.campuses)
    console.log('50 props ', this.props)

    return(
      <div>
      <h4>Edit {student && student.name}'s records</h4>
      <p>Change Campus</p>
      <form onSubmit={this.handleCampusChange}>
      <select name="newCampus" onChange={this.changeCampus}>
        <option>Select Campus</option>
      {this.state.campuses && this.state.campuses.map(function(campus, i) {
        return <option key={i} value={campus.name}>{campus.name}</option>
      })}
      </select>
      <button className="btn btn-info" type="submit" >
            <span className="glyphicon glyphicon-ok"></span>
          </button>
      </form>
      <p>Remove {student && student.name}</p>
      <form onSubmit={this.handleDelete}>
      <button className="btn btn-danger" type="submit" >
            <span className="glyphicon glyphicon-minus"></span> Remove Student
          </button>
          </form>
          </div>
    )
  }
}
