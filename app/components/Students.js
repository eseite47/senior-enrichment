import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';
import {fetchStudents} from '../reducers/index'

import RenderStudents from './RenderStudents'

export default class Students extends Component {
  constructor(){
    super()
    this.state = store.getState();
  }

  componentWillMount(){
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
    const thunk = fetchStudents();
    store.dispatch(thunk);
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  render(){
    const students = this.state.students
    return (
      <RenderStudents students={students}/>
    );
  }
}
