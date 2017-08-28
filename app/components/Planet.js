import React, { Component } from 'react';
import axios from 'axios';

import RenderStudents from './RenderStudents';
import EditCampus from './EditCampus'

export default class SinglePlanet extends Component {
  constructor(){
    super();
    this.state = {
      campusName: '',
      studentsArr: []
    }
  }

  componentWillMount(){
    const campusName = this.props.match.params.campusName;
    axios.get(`/api/planets/${campusName}`)
    .then(res => res.data)
    .then(data => {
      this.setState({campusName: campusName, studentsArr: data[0].Student})
    })
  }

  render(){
    return(
      <div className="container">
        <h1>{this.state.campusName}</h1>
        <div>
        <br />
          <RenderStudents students={this.state.studentsArr} planet={this.state.campusName}/>
        </div>
        <div>
          <EditCampus campus={this.props.match.params.campusName}/>
        </div>
      </div>
    )
  }
}
