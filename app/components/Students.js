import React, { Component } from 'react';
import axios from 'axios';
import RenderStudents from './RenderStudents'

export default class Students extends Component {
  constructor(){
    super()
    this.state ={
      students: []
    }
  }

  componentWillMount(){
    axios.get('/api/students')
    .then(res => res.data)
    .then(data =>{
      console.log(data)
      this.setState({students: data})
    })
  }

  render(){
    console.log('Our students: ', this.state.students)
    return (
      <RenderStudents students={this.state.students}/>
  );
  }
}
