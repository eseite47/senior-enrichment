import React from 'react';
import { Link } from 'react-router-dom';

const RenderStudents = (props) => {
  const students = props.students;

  return (
    <div className="container">
      {students && students.map((student) => {
        const planet = student.planet;
        return (
          <div className='col-lg-3' key={student.id}>
            <Link to={`/students/${student.id}`}>
              {student.imageURL && <img className='thumbnail' src={student.imageURL}></img>}
                {student.name} <br />
            </Link>
            { props.planet && <Link to={`/campuses/${props.planet}`}>{props.planet}</Link> || planet && <Link to={`/campuses/${planet.name}`}>{planet.name} Campus</Link> || <p>No Campus</p>
              }
          </div>
        )
      }
    )}
  </div>
  )
}

export default RenderStudents;
