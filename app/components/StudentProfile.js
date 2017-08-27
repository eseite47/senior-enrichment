import React, { Component } from 'react';
import axios from 'axios'
import { Link, BrowserRouter } from 'react-router-dom';

export default class StudentProfile extends Component {
  constructor(){
    super();
    this.state = {
      student: [],
      campuses: [],
      newCampus: 0
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.changeCampus = this.changeCampus.bind(this);
    this.handleCampusChange = this.handleCampusChange.bind(this)
  }

  componentDidMount(){
    const studentId = this.props.match.params.studentid
    axios.get(`/api/students/${studentId}`)
    .then(res => res.data)
    .then(data => {
      this.setState({student: data})
    })
    axios.get('api/planets')
    .then(res => res.data)
    .then(data => this.setState({campuses: data}))
  }

  handleDelete(e){
    e.preventDefault();
    console.log('I want to delete ', this.state.student)
    axios.delete(`/api/students/${this.state.student.id}`, this.state.student)
    .then(console.log('Trying to find redirect'))
  }

  changeCampus(e){
    const input = e.target.value
    this.setState({newCampus: input})
    console.log(this.state)
  }

  handleCampusChange(){
    const student = this.state.student;
    const campusSelection = parseInt(this.state.newCampus)
    //console.log(student.id)
    axios.put(`/api/students/${student.id}`, this.state)
    .then(console.log('request was sent'))
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
      <h4>Edit {student.name}'s records</h4>
      <p>Change Campus</p>
      <form onSubmit={this.handleCampusChange}>
      <select onChange={this.changeCampus}>
        <option>Select Campus</option>
      {this.state.campuses && this.state.campuses.map(function(campus) {
        return <option value={campus.id}>{campus.name}</option>
      })}
      </select>
      <button className="btn btn-info" type="submit" >
            <span className="glyphicon glyphicon-ok"></span>
          </button>
      </form>
      <p>Remove {student.name}</p>
      <form onSubmit={this.handleDelete}>
      <button className="btn btn-danger" type="submit" >
            <span className="glyphicon glyphicon-minus"></span> Remove Student
          </button>
          </form>
          </div>
    </div>)
  }
}
