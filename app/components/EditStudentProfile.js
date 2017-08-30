import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import store from '../store'
import {fetchPlanets} from '../reducers/index'


export default class EditStudentProfile extends Component {
  constructor(props){
    super(props);
    this.storeState = store.getState()
    this.state = {
      newCampus: ''
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleCampusChange = this.handleCampusChange.bind(this)
    this.changeCampus = this.changeCampus.bind(this)
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => {
      this.storeState = store.getState()
    })
    const thunk = fetchPlanets()
    store.dispatch(thunk)
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  //send server request for campus change
  handleCampusChange(){
    const student = this.props.student;
    axios.put(`/api/students/${student.id}`, {newCampus: this.state.newCampus})
  }

  //change state
  changeCampus(e){
    const input = e.target.value
    this.setState({newCampus: input})
  }

  handleDelete(e){
    e.preventDefault();
    axios.delete(`/api/students/${this.props.student.id}`, this.props.student)
  }

  render(){
    const student = this.props.student;
    let campuses;
    if(this.storeState.campuses){
      campuses = this.storeState.campuses
    }

    return (
      <div className="editStudent">
        {student && <h4><Link to={`/students/${student.id}/edit`}>Edit {student && student.name}'s records</Link></h4>}
        <h4>Change Campus</h4>
        <form onSubmit={this.handleCampusChange}>
          <select name="newCampus" onChange={this.changeCampus}>
            <option>Select Campus</option>
            {campuses && campuses.map(function(campus, i) {
            return <option key={i} value={campus.name}>{campus.name}</option>
            })
          }
          </select>
          <button className="btn btn-info" type="submit" >
            <span className="glyphicon glyphicon-ok"></span>
          </button>
        </form>
        <h4>Remove {student && student.name}</h4>
        <form onSubmit={this.handleDelete}>
          <button className="btn btn-danger" type="submit" >
            <span className="glyphicon glyphicon-minus"></span> Remove Student
          </button>
        </form>
      </div>
    )
  }
}
