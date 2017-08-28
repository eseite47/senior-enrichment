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
    const planets = this.state.planets;
    console.log(this.state)
    return (<div className="container planet">
      {planets && planets.map((planet, i) => {
        return <div key={i} className="col-lg-4">
          <Link to={`/campuses/${planet.name}`}>
            <p>{planet.name}</p>
            <img src={planet.imageURL}></img>
          </Link>
          </div>
        })
      }
      </div>)
    }
  }
