import React from 'react';

const RenderStudents = (props) => {

  const students = props.students;

  console.log('students in RenderStudents: ', students)
  return (<div className="container">
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
          students && students.map(student => (
            <tr key={student.id}>
              <td>{student.id }</td>
              <td>{student.name}</td>
              { props.planet && <td>{props.planet}</td> || student.planet.name && <td>{student.planet.name}</td>
              }
              {/* {student.planet.name && <td>{student.planet.name}</td>} */}
            </tr>
          ))}
      </tbody>
    </table>
    </div>)
}

export default RenderStudents;
