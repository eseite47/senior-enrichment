import React, { Component } from 'react';
import axios from 'axios';
import store from '../store'
import {createCampus} from '../reducers/index'

export default class AddCampus extends Component {
  constructor(){
    super();
    this.storeState = store.getState()
    this.state = {
      name: '',
      imageURL: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => this.storeState = store.getState())
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
    const thunk = createCampus(this.state)
    store.dispatch(thunk)
  }

  render(){
    return (
      <div className='container form'>
        <form onSubmit={this.handleSubmit}>
          <div>
            <h4>New Campus Name</h4>
            <input
              className='form-control'
              type="text"
              name="name"
              placeholder="New Campus Name"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <h4>Campus Image</h4>
            <input
              className='form-control'
              type="text"
              name="imageURL"
              placeholder="Campus Image"
              onChange={this.handleChange}
              value={this.state.imageURL}
            />
          </div>
          <button type="submit" className="btn btn-default">Submit
          </button>
        </form>
      </div>
    )
  }
}
