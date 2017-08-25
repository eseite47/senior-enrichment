import React, { Component } from 'react';
import axios from 'axios'

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
    console.log()
    return (<div>
      {this.state.planets.map(planet => {
        return <div><p>{planet.name}</p> <img src={planet.imageURL}></img></div>
      })}
      </div>)
    }
  }
