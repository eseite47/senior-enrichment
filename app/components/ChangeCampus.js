import React, { Component } from 'react';
import axios from 'axios';
import RenderStudents from './RenderStudents';

export default class SinglePlanet extends Component {
  constructor(){
    super();
    this.state = {
      campusName: '',
      allStudents: []
    }
    this.handleDelete = this.handleDelete.bind(this)
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

  handleDelete(e){
    e.preventDefault();
    console.log('I want to delete ', this.state)
    axios.delete(`/api/planets/${this.state.campusName}`, this.state.campusName)
    .then(console.log('Trying to find redirect'))
  }

  render(){
    //console.log('state ', this.state)
    return(
      <div className="container">
      <div>
        <h4>Add Students to {this.state.campusName}</h4>
      <form onSubmit={this.handleCampusChange}>
      <select onChange={this.changeCampus}>
        <option>Select Student</option>
      {this.state.allStudents && this.state.allStudents.map(function(student) {
        return <option value={student.id}>{student.name}</option>
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
