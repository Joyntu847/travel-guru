import React from 'react';
import './Booking.css';
import { Form } from 'react-bootstrap';
import {Link, useParams } from 'react-router-dom';
import Place from '../../FakeData/Place';
import Header from '../Header/Header';

const Booking = () => {
     const {Id} = useParams({});
     //console.log(Place)
     const booking = Place.find(pc => pc.id === Id);
     console.log(booking)
     const {name,details,origin} = booking;
    return (
        <div className='banner-area'>
            <div className='menu-area'>
                <Header></Header>
            </div>
            <div className="banner-wrapper">
               <div className="container">
                   <div className='row d-flex align-items-center'>
                      <div className="col-md-6">
                          <div className="banner-info">
                              <h1>{name}</h1>
                              <p>{details}</p>
                          </div>
                      </div>

                      <div className="col-md-4 offset-1 d-flex">
                         <div className="booking-input">
                            <Form.Group>
                                <label>Origin</label>
                                <Form.Control className='bkg-input' type="text" placeholder={origin} disabled/>
                                <label>Destination</label>
                                <Form.Control className='bkg-input' type="text" placeholder={name} disabled/>
                                <div className='d-flex justify-content-between'>
                                    <label htmlFor="">Form</label>
                                    <label htmlFor="">To</label>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <input className='bkg-input1' type="date" />
                                    <input className='bkg-input1' type="date" />
                                </div>
                                <Link to='/destination'><button className='btn bkg-btn'>Start Booking</button></Link>  
                            </Form.Group>
                         </div>
                      </div>
                   </div>

               </div>
            </div>
        </div>
    );
};

export default Booking;