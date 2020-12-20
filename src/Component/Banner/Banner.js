import React from 'react';
import Header from '../Header/Header';
import './Banner.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCoffee } from '@fortawesome/free-solid-svg-icons';
import Place from '../../FakeData/Place';
import { Link } from 'react-router-dom';


const Banner = () => {
    return (
        <div className='banner-area'>
            <div className='menu-area'>
                <Header></Header>
            </div>
            <div className='banner-wrapper'>
               <div className='container'>
                  <div className="row d-flex align-items-center">
                     <div className="col-md-3">
                        <div className='banner-info'>
                            <h1>SAJEK VALLEY</h1>
                            <p>Sajek Valley (Bengali: সাজেক উপত্যকা) is an emerging tourist spot in Bangladesh situated among the hills of the Kasalong range of mountains in Sajek union, Baghaichhari Upazila in Rangamati District.[3] The valley is 1,476 feet (450 m) above sea level.[4] Sajek valley is known as the Queen of Hills & Roof of Rangamati.</p>
                            <Link to="/destination"><button className='btn menu-btn'>Booking <FontAwesomeIcon icon={faArrowRight} /></button></Link>
                         </div>
                     </div>

                     <div className="col-md-4 d-flex">
                                {
                                    Place.map(place =>
                                    <div className='banner-content'>
                                        <div className='banner-img'>
                                               <Link to ={`/booking/${place.id}`}><img src={place.img} alt=""/></Link> 
                                            <div className='banner-text'>
                                            <h2>{place.name}</h2>
                                            </div>
                                        </div>
                                    </div>)
                                }
                     </div>

                  </div>
               </div>
            </div>
        </div>
    );
};

export default Banner;