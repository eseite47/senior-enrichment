import { combineReducers } from 'redux'
import axios from 'axios'

const initialState = {}

//Action Types
const GET_PLANETS = 'GET_PLANETS';
const GET_STUDENTS = 'GET_STUDENTS';

//Action Creators
export function getPlanets(planets){
  const action = {type: GET_PLANETS, planets};
  return action;
}

export function getStudents(students){
  const action = {type: GET_STUDENTS, students};
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

//Reducer
const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    case GET_PLANETS:
      return Object.assign({}, state, {planets: action.planets});
    case GET_STUDENTS:
      return Object.assign({}, state, {students: action.students});
    default:
      return state
  }
};

export default rootReducer
