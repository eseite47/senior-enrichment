import React, { Component } from 'react';
import axios from 'axios'
import store from '../store'
import { Link } from 'react-router-dom';
import {fetchPlanets, createStudent} from '../reducers/index'

export default class AddStudent extends Component {
  constructor(){
    super();
    this.storeState = store.getState()
    this.state = {
      name: '',
      imageURL: '',
      planetId: 0,
      email: '',
      bio: '',
      reportCard: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleChange(e){
    const input = e.target.value;
    const name = e.target.name;
    this.setState({[name]: input})
  }

  handleSubmit(e){
    //console.log('submit is handled!', props)
    e.preventDefault();

    const thunk = createStudent(this.state)
    store.dispatch(thunk)
    this.props.history.push('/students')
  }

  render(){
    console.log(this.props)
    let campuses;
    if (this.storeState.campuses){
      campuses = this.storeState.campuses
    }

    console.log('this.state ', this.state)

    return (
      <div className='container form'>
        <h1>Student Enrollment Form</h1>
        <p>Please feel out the following in order to register a new student.</p><br />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
           <h4>Student Name</h4>
            <input
              className='form-control'
              type="text"
              name="name"
              placeholder="New Student Name"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <h4>Student email</h4>
            <input
              className='form-control'
              type="text"
              name="email"
              placeholder="Student email"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <h4>Student Thumbnail</h4>
            <input
              className='form-control'
              type="text"
              name="imageURL"
              placeholder="Student ImageURL"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <h4>Student Bio</h4>
            <textarea
              className='form-control'
              type="text"
              name="bio"
              placeholder="Student ImageURL"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <h4>Student report card</h4>
            <textarea
              className='form-control'
              type="text"
              name="reportCard"
              placeholder="Student report card"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <h4>Campus</h4>
            <select
            className='form-control'
            name='planetId'
            onChange={this.handleChange}>
              <option>Pick Campus</option>
              {campuses && campuses.map(function(campus, i) {
                return <option key={i} value={campus.id}>{campus.name}</option>
              })
            }
            </select>
          </div>
          <button type="submit" className="btn btn-default">Submit
          </button>
        </form>
      </div>
    )
  }
}
