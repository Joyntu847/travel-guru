import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Component/Header/Header';
import Banner from './Component/Banner/Banner';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Booking from './Component/Booking/Booking';
import { createContext, useState } from 'react';
import Login from './Component/Login/Login';
import Blog from './Component/Blog/Blog';
import Contact from './Component/Contact/Contact';
import NotMatch from './Component/NotMatch/NotMatch';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import Destination from './Component/Destination/Destination';


export const UserContext = createContext();

function App() {
  const [loggedInUser,setLoggedInUser] = useState({
    // isSignIn : false,
    name :'',
    emails:'',
    photo :'',
    password :'',
    message :''
  })
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path="/home">
             <Banner/>
          </Route>
          <Route path="/news">
              <Banner/>
          </Route>
          <Route path='/booking/:Id' >
              <Booking/>
          </Route>
          
          <PrivateRoute path='/destination'>
            <Destination/>
          </PrivateRoute>
          <Route path='/login'>
              <Login/>
          </Route>
          <Route path="/blog">
            <Blog/>
          </Route>
          <Route path="/contact">
            <Contact/>
          </Route>
          <Route path="/booking">
            <Booking/>
          </Route>
          <Route exact path="/">
            <Banner/>
          </Route>
          <Route path="*"> 
             <NotMatch/>
          </Route>
        </Switch>
      </Router>
   </UserContext.Provider> 
  );
}

export default App;
