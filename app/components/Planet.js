import React, { Component } from 'react';
import axios from 'axios';
import RenderStudents from './RenderStudents';

export default class SinglePlanet extends Component {
  constructor(){
    super();
    this.state = {
      planetName: '',
      studentsArr: []
    }
  }

  componentDidMount(){
    const planetName = this.props.match.params.campusName;
    //console.log('planet 16 planetName ', planetName)
    axios.get(`/api/planets/${planetName}`)
    .then(res => res.data)
    .then(data => {
      //console.log('20 campus data: ', data[0].Student)
      this.setState({planetName: planetName, studentsArr: data[0].Student})
    })
  }

  render(){
    //console.log('state ', this.state)
    return(
      <div>
      <h4>{this.state.planetName}</h4>
      <RenderStudents students={this.state.studentsArr} planet={this.state.planetName}/>
      </div>
    )
  }
}
