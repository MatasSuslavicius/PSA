import React, { useState } from 'react';
import './App.css'
import { BrowserRouter, Route,  Switch, Redirect} from 'react-router-dom'
import Comments from './views/Comments'
import CommentEdit from './views/CommentEdit'
import CommentAdd from './views/CommentAdd'
import Home from './views/Home'
import AdminHome from './AdminViews/AdminHome'
import AdminPlaces from './AdminViews/AdminPlaces'
import AdminComments from './AdminViews/AdminComments'
import PlaceEdit from './AdminViews/PlaceEdit'
import PlaceAdd from './AdminViews/PlaceAdd'
import GuideProfile from './GuideViews/GuideProfile'
import GuideNavBar from './GuideViews/GuideNavBar'
import GuideEdit from './GuideViews/GuideEdit'
import GuideHome from './GuideViews/GuideHome'
import GuideRate from './GuideViews/GuideRate'
import GuideRoutes from './GuideViews/GuideRoutes'

import LoginForm from './views/Login'
import RateGuide from './ClientViews/RateGuide'
import ClientNavBar from './ClientViews/ClientNavBar'
import ClientHome from './ClientViews/ClientHome'
import NavBar from './components/NavBar'

function App(props, state) {

  const adminUser = {
    username: "admin",
    password: "admin"
  }
  const guideUser = {
    username: "guide",
    password: "guide"
  }
  const clientUser = {
    username: "client",
    password: "client"
  }

  const [user, setUser] = useState({ name: ""});
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);

    if ((details.name == adminUser.username && details.password == adminUser.password) ||(details.name == guideUser.username && details.password == guideUser.password)||(details.name == clientUser.username && details.password == clientUser.password)) {
      console.log("Logged in");
      setUser({
        name: details.name
      })
    }
    else {
      console.log("Details dont match");
      setError("Details do not match!");
    }
  }
  const Logout = () => {
    console.log("Logout");
    setUser({ name:""});
  }
  
  return (


    <div className='App'>
      {(user.name == "admin") ?
        (
          <BrowserRouter>
            <NavBar Logout={Logout} />
            <Switch>
              <Route exact path='/' component={AdminHome} />
              <Route path='/comments' component={AdminComments} />
              <Route path='/places' component={AdminPlaces} />
              <Route path='/placeEdit' component={PlaceEdit} />
              <Route path='/placeAdd' component={PlaceAdd} />
              <Route path='/commentEdit' component={CommentEdit} />
              <Route path='/commentAdd' component={CommentAdd} />

            </Switch>
          </BrowserRouter>
        )
        : (user.name == "guide") ?
          (
            <BrowserRouter>
            <GuideNavBar Logout={Logout} />
            <Switch>
              <Route exact path='/' component={GuideHome} />
              <Route path='/comments' component={Comments} />
              <Route path='/guideProfile' component={GuideProfile} />
              <Route path='/guideEdit' component={GuideEdit} />
              <Route path='/guideRate' component={GuideRate} />
              <Route path='/guideRoutes' component={GuideRoutes} />
              <Route path='/commentEdit' component={CommentEdit} />
              <Route path='/commentAdd' component={CommentAdd} />
            </Switch>
          </BrowserRouter>
          )
          : (user.name == "client") ?
            (
              <BrowserRouter>
                <ClientNavBar Logout={Logout} />
                <Switch>
                  <Route exact path='/' component={ClientHome} />
                  <Route path='/comments' component={Comments} />
                  <Route path='/rateGuide' component={RateGuide} />
                  <Route path='/commentEdit' component={CommentEdit} />
                  <Route path='/commentAdd' component={CommentAdd} />
                </Switch>
              </BrowserRouter>
            )
            : (
              <LoginForm Login={Login} error={error} />
            )}

    </div>
  );
}

export default App;