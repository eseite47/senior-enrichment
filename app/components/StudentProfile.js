import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

export default class StudentProfile extends Component {
  constructor(){
    super();
    this.state = {
      student: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    const studentId = this.props.match.params.studentid
    axios.get(`/api/students/${studentId}`)
    .then(res => res.data)
    .then(data => {
      this.setState({student: data})
    })
  }

  handleSubmit(e){
    e.preventDefault();
    console.log('I want to delete ', this.state.student)
    axios.delete('/api/student', this.state)
    .then(console.log)
  }

  render(){
    const student = this.state.student;
    //const planet = student.planet.name;

    //console.log('This student is on this campus: ', student.planet)
    return(<div className='container'>

      <h4>{student.name}</h4>
      {/* <p>{planet}</p> */}
      <img src={student.imageURL}></img><br />
      <form onSubmit={this.handleSubmit}>
      <button className="btn btn-danger" type="submit" >
            <span className="glyphicon glyphicon-minus"></span> Remove Student
          </button>
          </form>
    </div>)
  }
}
