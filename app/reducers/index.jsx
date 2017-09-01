import { combineReducers } from 'redux'
import axios from 'axios'

const initialState = {}

//Action Types
const GET_CAMPUSES = 'GET_CAMPUSES'; //Get all the planets
const GET_CAMPUS_FROM_STUDENT = 'GET_CAMPUS_FROM_STUDENT' //Find the campus of a student
const CURRENT_CAMPUS = 'CURRENT_CAMPUS' //Get one planet
const ADD_CAMPUS = 'ADD_CAMPUS'
const DELETE_CAMPUS = 'DELETE CAMPUS'

const GET_STUDENTS = 'GET_STUDENTS'; //Get all the students
const GET_STUDENTS_FROM_CAMPUS = 'GET_STUDENTS_FROM_CAMPUS'; //Get all the students for a campus
const EDIT_STUDENT_CAMPUS = 'EDIT_STUDENT_CAMPUS'
const CURRENT_STUDENT = 'CURRENT_STUDENT';//Get one student
const ADD_STUDENT = 'ADD_STUDENT'

//Action Creators
export function getPlanets(planets){
  const action = {type: GET_CAMPUSES, planets};
  return action;
}

export function getCampusFromStudents(campus){
  const action = {type: GET_CAMPUS_FROM_STUDENT, campus};
  return action;
}

export function addCampus(planet){
  const action = {type: ADD_CAMPUS, planet};
  return action;
}

export function setCurrentPlanet(planet){
  const action = {type: CURRENT_CAMPUS, planet};
  return action;
}

export function deleteCampus (planet){
  const action = {type: DELETE_CAMPUS, planet};
  return action;
}

export function getStudents(students){
  const action = {type: GET_STUDENTS, students};
  return action;
}

export function getStudentsFromCampus(campusStudents){
  const action = {type: GET_STUDENTS_FROM_CAMPUS, campusStudents};
  return action;
}

export function setCurrentStudent(student){
  const action = {type: CURRENT_STUDENT, student};
  return action;
}

export function addStudent(student){
  const action = {type: ADD_STUDENT, student};
  return action;
}

export function editStudentCampus(student, act){
  const action = {type: EDIT_STUDENT_CAMPUS, student, act}
  return action;
}

//Thunk Creators
export function fetchPlanets(){
  return function thunk (dispatch){
    return axios.get('api/planets')
    .then(res => res.data)
    .then(planets => {
      const action = getPlanets(planets);
      dispatch(action)
    })
  }
}

export function fetchStudents(){
  return function thunk (dispatch){
    return axios.get('/api/students')
    .then(res => res.data)
    .then(students =>{
      const action = getStudents(students);
      dispatch(action)
    })
  }
}

export function fetchOneStudent(studentId){
  return function thunk (dispatch){
    axios.get(`/api/students/${studentId}`)
    .then(res => res.data)
    .then(data => {
      const action = setCurrentStudent(data)
      dispatch(action)
    })
  }
}

export function fetchStudentsFromCampus(campusName){
  return function thunk (dispatch){
    return axios.get(`/api/planets/${campusName}`)
    .then(res => res.data)
    .then(data => {
      const students = data[0].Student;
      const action = getStudentsFromCampus(students);
      dispatch(action)
    })
  }
}

export function fetchCampusFromStudent(studentId){
  return function thunk(dispatch){
    return axios.get(`/api/students/${studentId}`)
    .then(res => res.data)
    .then(data => {
      const action = getCampusFromStudents(data)
      dispatch(action)
    })
  }
}

export function createCampus(newCampusData){
  return function thunk(dispatch){
    return axios.post('api/planets', newCampusData)
    .then(res => res.data)
    .then(data => {
      const action = addCampus(data)
      dispatch(action)
      console.log('Created a new planet: ', data)
    })
  }
}

export function createStudent (state){
  return function thunk(dispatch){
    return axios.post('api/students', state)
  }
}

export function deleteCampusThunk (planet){
  return function thunk (dispatch){
    return axios.delete(`/api/planets/${planet}`, planet)
    .then(res =>{
      dispatch(deleteCampus(planet))
    })
  }
}

export function editStudentCampusThunk (student, campus, act){
  console.log('editing campus', student, campus, act)
  return function thunk (dispatch){
    return axios.put(`api/students/${student}`, {newCampus: campus})
    .then(res => {
      console.log('something happened with axios', student, act)
      dispatch(editStudentCampus(student, act))
    })
  }
}

//Reducer
const rootReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_CAMPUSES:
      return Object.assign({}, state, {campuses: action.planets});
    case GET_STUDENTS:
      return Object.assign({}, state, {allstudents: action.students});
    case GET_STUDENTS_FROM_CAMPUS:
      return Object.assign({}, state, {students: action.campusStudents});
    case GET_CAMPUS_FROM_STUDENT:
      return Object.assign({}, state, {campus: action.campus})
    case CURRENT_CAMPUS:
      return Object.assign({}, state, {currentCampus: action.planet})
    case CURRENT_STUDENT:
      return Object.assign({}, state, {currentStudent: action.student})
    case ADD_CAMPUS:
      return Object.assign({}, state, {campuses: state.campuses.push(action.planet)})
    case DELETE_CAMPUS:
      return Object.assign({}, state, {campuses: state.campuses.filter(campus => {
        return campus.name !== action.planet.name}
      )})
    case EDIT_STUDENT_CAMPUS:
        console.log('reaching cases', action.act)
      if (action.act === 'add'){
        console.log('adding')
        return Object.assign({}, state, {students: state.students.push(action.student)})
      }
      else {
        return Object.assign({}, state, {students: state.students.filter(stud => stud.name !== action.student.name)})
      }
    default:
      return state
  }
};

export default rootReducer
