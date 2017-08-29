import React from 'react';
import { Link } from 'react-router-dom';

const RenderStudents = (props) => {
  //console.log('props', props)
  const students = props.students;
  //console.log('students in RenderStudents: ', students)

  return (
    <div className="container">
      {students && students.map((student) => {
        const planet = student.planet;
        //console.log('13 props ', props.campus)
        return (
          <div className='col-lg-3' key={student.id}>
            <Link to={`/students/${student.id}`}>
              {student.imageURL && <img className='thumbnail' src={student.imageURL}></img> || <img className='thumbnail' src="http://www.havoca.org/wp-content/uploads/2016/03/icon-user-default-300x300.png"></img>}
                {student.name} <br />
            </Link>
            { props.planet && <Link to={`/campuses/${props.planet}`}>{props.planet}</Link> || planet && <Link to={`/campuses/${planet.name}`}>{planet.name} Campus</Link> || <p>Not Enrolled at a Campus</p>
              }
          </div>
        )
      }
    )}
  </div>
  )
}

export default RenderStudents;
