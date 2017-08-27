import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Planets extends Component {
  constructor(){
    super()
    this.state ={
      planets: []
    }
  }

  componentWillMount(){
    axios.get('/api/planets')
    .then(res => res.data)
    .then(data =>{
      this.setState({planets: data})
    })
  }

  render(){
    //console.log()
    return (<div className="container planet">
      {this.state.planets.map(planet => {
        return <div className="col-lg-4">
          <Link to={`/campuses/${planet.name}`}>
          <p>{planet.name}</p>
          <img src={planet.imageURL}></img>
          </Link>
          </div>
      })}

      </div>)
    }
  }
