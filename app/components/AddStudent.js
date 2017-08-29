import React, { Component } from 'react';
import axios from 'axios'
import store from '../store'
import {fetchPlanets, createStudent} from '../reducers/index'

export default class AddStudent extends Component {
  constructor(){
    super();
    this.storeState = store.getState();
    this.state = {
      name: '',
      imageURL: '',
      planetId: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
    this.unsubscribe = store.subscribe(() => this.storeState = store.getState())

    const thunk = fetchPlanets()
    store.dispatch(thunk)
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  handleChange(e){
    //console.log('e ', e.target)
    const input = e.target.value;
    const name = e.target.name;
    //console.log('name ', name, 'input ', input)
    this.setState({[name]: input})
    //console.log('handleChange ', this.state)
  }

  handleSubmit(e){
    console.log('submit is handled!')
    e.preventDefault();

    const thunk = createStudent(this.state)
    store.dispatch(thunk)
    // axios.post('api/students', {
    //   name: this.state.name,
    //   imageURL: this.state.imageURL,
    //   planetId: this.state.planetId
    // })
    // .then(res => res.data)
    // .then(data => {
    //   console.log('Created a new student: ', data)
    // })
    //console.log(this.state)
  }

  render(){
    const campuses = this.storeState.campuses;
    console.log('this.state ', campuses)

    return (
      <div className='container form'>
        <form onSubmit={this.handleSubmit}>
          <div>
           <h4>New Student Name</h4>
            <input
              type="text"
              name="name"
              placeholder="New Student Name"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <h4>Student Thumbnail</h4>
            <input
              type="text"
              name="imageURL"
              placeholder="student Image"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <h4>Campus</h4>
            <select name='planetId' onChange={this.handleChange}>
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
