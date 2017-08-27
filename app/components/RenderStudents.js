import React from 'react';
import { Link } from 'react-router-dom';


const RenderStudents = (props) => {

  const students = props.students;

  console.log('students in RenderStudents: ', students)
  return (<div className="container">
    <Link className="btn btn-block" to="/addStudent">
            <span className="glyphicon glyphicon-plus"></span> Add Student
          </Link>
        {students.map(student => (
            <div className='col-lg-3' key={student.id}>
            <img className='thumbnail' src={student.imageURL}></img>
                <Link to={`/students/${student.id}`}>{student.name} <br />
                </Link>
              {/* { props.planet && <Link to={`/campuses/${props.planet}`}>{props.planet}</Link> || student.planet.name && <Link to={`/campuses/${student.planet.name}`}>{student.planet.name} Campus</Link> */}
              }
              </div>
          ))}
    </div>)
}

export default RenderStudents;
