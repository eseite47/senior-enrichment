import React from 'react';
import { HashRouter, Route, Switch, Link  } from 'react-router-dom';

import Navbar from './Navbar';
import PlanetsView from './PlanetView';
import Students from './Students';
import Planet from './Planet';
import AddCampus from './AddCampus'
import StudentProfile from './StudentProfile';
import AddStudent from './AddStudent';
import HomePage from './HomePage'

const Root = () => {
  return (
    <HashRouter>
      <div>
        <Navbar />
        <switch>
        <Route path='/students/:studentid' component={StudentProfile} />
        <Route exact path='/students' component={Students} />

          <Route  path='/campuses/:campusName' component={Planet} />
          <Route exact path='/campuses' component={PlanetsView} />
          <Route path='/addCampus' component={AddCampus} />
          <Route path='/addStudent' component={AddStudent} />
          <Route exact path='/' component={HomePage} />
        </switch>
      </div>
    </HashRouter>
  )
}
export default Root;
