import React, { Component } from 'react';
import axios from 'axios'

export default class EditDetails extends Component {
  constructor(){
    super();
    this.state = {}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    const input = e.target.value;
    const name = e.target.name;
    this.setState({[name]: input})
  }

  handleSubmit(e){
    console.log('submit is handled!')
    e.preventDefault();
    axios.put(`/api/students/edit/${parseInt(this.props.match.params.studentid)}`, this.state).then(() => console.log('Edited'))
    this.props.history.push(`/students/${this.props.match.params.studentid}`)
  }

  render(){
    const id = parseInt(this.props.match.params.studentid)
    console.log('this.state ', this.state);
    console.log('studentid: ', typeof this.props.match.params.studentid)

    return (
      <div className='container form'>
        <h1>Edit Student {id} Details</h1>
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
          <button type="submit" className="btn btn-default">Submit
          </button>
        </form>
      </div>
    )
  }
}
