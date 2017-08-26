import React, { Component } from 'react';
import axios from 'axios';

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
    <table className='table'>
      <thead>
        <tr>
          <th>StudentId</th>
          <th>Name</th>
          <th>Campus</th>
        </tr>
      </thead>
      <tbody>
        {
          this.state.students && this.state.students.map(student => (
            <tr key={student.id}>
              <td>{student.id }</td>
              <td>{student.name}</td>
              <td></td>
            </tr>
          ))}
      </tbody>
    </table>
  );
  }
}
