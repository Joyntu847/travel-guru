import React, { useContext, useState } from 'react';
import './Login.css';
import Google from '../../Images/Icon/google.png';
import { UserContext } from '../../App';
import  firebase from "firebase/app";
import "firebase/auth";
import FirebaseConfig from './FirebaseConfig';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { Form } from 'react-bootstrap';
import Header from '../Header/Header';



const Login = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)
    const [user,setUser] = useState(false)
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || {from: {path: '/'}};


    if (firebase.apps.length === 0){
        firebase.initializeApp(FirebaseConfig);
    }

    const googleLogIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            const {displayName , email} = result.user;
            const googleNewUser = {name: displayName, email: email};
            setLoggedInUser(googleNewUser);
            history.replace(from);
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            const newUserInfo = {...loggedInUser};
              newUserInfo.message = error.message;
              setLoggedInUser(newUserInfo);
            // ...
          });
       }

       const handleSubmit = (e) => {
           if (user && loggedInUser.email && loggedInUser.password) {
            firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
            .then(res => {
              // Signed 
                const {displayName , email} = res.user;
                const googleNewUser = {name : displayName ,  email:email}
                setLoggedInUser(googleNewUser);
                history.replace(from);
                user.updateProfile({
                    displayName:loggedInUser.name ,
                })
                
              // ...
            })
            .catch((error) => {
                const newUserInfo = { ...loggedInUser };
                newUserInfo.message = error.message;
                newUserInfo.success = false;
                setLoggedInUser(newUserInfo);
            });
           }

       if (!user && loggedInUser.email && loggedInUser.password){
        firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
        .then( res => {
          // Signed in 
             const {displayName , email} = res.user;
             const googleNewUser = {name : displayName ,  emails:email}
             setLoggedInUser(googleNewUser);
             history.replace(from);
          // ...
        })
        .catch((error) => {
            const newUserInfo = { ...loggedInUser };
            newUserInfo.message = error.message;
            newUserInfo.success = false;
            setLoggedInUser(newUserInfo);
        });
       }
       e.preventDefault();
    }

    //handle change 
    const handleChange = (e) => {
        let emailValid = true;
            if (e.target.name === 'email'){
              emailValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name === "password"){
            const passwordValid = e.target.value.length >= 6;
            emailValid = passwordValid;

        }
        if(emailValid) {
            const newUserInfo = {...loggedInUser};
            newUserInfo[e.target.name] = e.target.value;
            setLoggedInUser(newUserInfo);
        }
    }
    return (
        <div className='banner-area'>
            <div className='main-area'>
                <Header></Header>
            </div>
            <div className="banner-wrapper form-wrapper">
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="col-md-6 offset-3">
                            <Form className='log-form' onSubmit={handleSubmit}>
                                 <h4>Login</h4>
                                 {user && <Form.Group>
                                    <Form.Control name='name' onBlur= {handleChange} className='form-border' type="text" placeholder="Enter Your Name" />
                                   </Form.Group>
                                 }
                              <Form.Group>
                                  <Form.Control name='email' onBlur= {handleChange} className='form-border' type="email" placeholder=" Email" />
                              </Form.Group>
                              <Form.Group>
                                  <Form.Control name='password' onBlur= {handleChange} className='form-border' type="password" placeholder="Password" />
                              </Form.Group>

                              <Form.Group  className='forgot d-flex justify-content-between'>
                                  <Form.Check type="checkbox" label="Remember Me "/>
                                  <Link className='password'>Forgot Password</Link>
                              </Form.Group>

                              <div className='d-flex justify-content-center login-btn'>
                                  <input className='submit-btn' variant="primary" type="submit" value='Log In' />
                              </div>
                              <div className='text-center text-light span-link'>
                                  {user ? 
                                      <span>You alrady have an account? <button className='btn btn-outline-warning' onClick={() =>setUser(!user)}> Log in </button> </span> : <span>Don’t have an account? <button className='btn btn-outline-warning' onClick={() => setUser(!user)}> Create an account</button> </span>
                                  }
                               </div> 
                            </Form>

                            <div className="form-bottom">
                               <div className='d-flex justify-content-center'>
                                  <span></span> <h6>OR</h6>
                                  <span></span>
                               </div>
                               
                               {/* //google signin button */}
                                  <button className='google-btn' onClick={googleLogIn}>
                                     <img src={Google} style={{width:'30px', float:'left',marginLeft:'20px'}} alt=""/> Continue with Google
                                  </button>
                              </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        
    );
};

export default Login;