import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import store from '../store'
import {fetchPlanets} from '../reducers/index'

export default class Planets extends Component {
  constructor(){
    super()
    this.state = store.getState()
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(()=>{
      this.setState(store.getState())
    })
    const thunk = fetchPlanets();
    store.dispatch(thunk)
  }
  componentWillUnmount(){
    this.unsubscribe();
  }

  render(){
    const campuses = this.state.campuses;
    console.log(this.state)
    return (<div className="container planet">
      {campuses && campuses.map((campus, i) => {
        return <div key={i} className="col-lg-4">
          <Link to={`/campuses/${campus.name}`}>
            <h1>{campus.name}</h1>
            <img src={campus.imageURL}></img>
          </Link>
          </div>
        })
      }
      </div>)
    }
  }
