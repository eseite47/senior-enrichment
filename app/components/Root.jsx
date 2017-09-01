import React from 'react';
import { HashRouter, Route, Switch} from 'react-router-dom';

import Navbar from './Navbar';
import PlanetsView from './PlanetView';
import Students from './Students';
import Planet from './Planet';
import AddCampus from './AddCampus'
import StudentProfile from './StudentProfile';
import AddStudent from './AddStudent';
import HomePage from './HomePage'
import EditStudentDetails from './EditStudentDetails'
import EditStudentProfile from './EditStudentProfile'
import Footer from './footer'

const Root = () => {
  return (
    <HashRouter>
      <div>
        <Navbar />
        <Switch>
          <Route path='/students/:studentid/edit' component={EditStudentDetails} />
          <Route path='/students/:studentid/delete' component={EditStudentProfile} />
          <Route exact path='/students/:studentid' component={StudentProfile} />
          <Route exact path='/students' component={Students} />
          <Route  path='/campuses/:campusName' component={Planet} />
          <Route exact path='/campuses' component={PlanetsView} />
          <Route path='/addCampus' component={AddCampus} />
          <Route path='/addStudent' component={AddStudent} />
          <Route exact path='/' component={HomePage} />
        </Switch>
        <Footer />
      </div>
    </HashRouter>
  )
}
export default Root;
