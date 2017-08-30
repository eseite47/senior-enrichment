import React, { Component } from 'react';
import axios from 'axios';

import store from '../store';
import RenderStudents from './RenderStudents';
import EditCampus from './EditCampus';
import {fetchStudentsFromCampus, setCurrentPlanet} from '../reducers/index';

export default class SinglePlanet extends Component {
  constructor(){
    super();
    this.state = store.getState()
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
    const campusName = this.props.match.params.campusName;
    // axios.get(`/api/planets/${campusName}`)
    // .then(res => res.data)
    // .then(data => {
    //   this.setState({campusName: campusName, studentsArr: data[0].Student})
    // })
    console.log('campus name ', campusName)
    const thunk = fetchStudentsFromCampus(campusName)
    store.dispatch(thunk)
    store.dispatch(setCurrentPlanet(campusName))

  }

  render(){
    console.log('campus from store ', this.state)
    return (
      <div className="container">
        <h1>{this.state.currentCampus}</h1>
        <div>
        <br />
          <RenderStudents students={this.state.students} planet={this.state.currentCampus}/>
        </div>
        <div>
          <EditCampus campus={this.state.currentCampus} history={this.props.history}/>
        </div>
      </div>
    )
  }
}
