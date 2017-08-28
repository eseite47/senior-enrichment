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
      this.setState({students: data})
    })
  }

  render(){
    return (
      <RenderStudents students={this.state.students}/>
    );
  }
}
