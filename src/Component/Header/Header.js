import React, { useContext } from 'react';
import './Header.css'; 
import {Button,Container,Form,FormControl,Nav,Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Logo from '../../Images/Logo.png';


const Header = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    return (
        <Navbar className='our-menu' expand='lg'>
            <Container>
                <Navbar.Brand>
                <Link to="/home"><img style={{width:'120px',filter: 'contrast(0%) brightness(250%)'}} src={Logo} alt=""/></Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                   <Form inline className="mr-auto">
                       <FormControl type="text" placeholder="Search Your Destination" className="header-input"/>
                   </Form>
                   <Nav className="ml-auto">
                      <Nav.Link > <Link to='/news' className='menu-list'>News</Link> </Nav.Link> 
                      <Nav.Link > <Link to='/destination' className='menu-list'>Destination</Link> </Nav.Link>
                      <Nav.Link > <Link to='/blog' className='menu-list'>Blog</Link> </Nav.Link>
                      <Nav.Link > <Link to='/contact' className='menu-list'>Contact</Link> </Nav.Link>  
                       
                       {
                           !loggedInUser.email ? <Link to="login"><Button className="btn menu-btn">Login</Button></Link> : <Link to ="/"><Button>Sign Out</Button></Link>
                       }

<h6 style={{lineHeight:'40px',marginLeft:'5px', color:'#ffffff'}}>{!loggedInUser.email ? 'User' : `${loggedInUser.name}` }</h6>
                   </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;