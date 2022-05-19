import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './Nav.scss';
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router";




const Navigation = () => {
    const navigate = useNavigate()
    const [expand, setexpand] = React.useState(false);
    const [pathstate, setpathstate] = React.useState('#home');
    const[user,setUser] = React.useState(localStorage.getItem("token"));

    window.onscroll = function () {
        if (window.pageYOffset === 0) {
            setpathstate('#home');
        }
    };

    

    React.useEffect(() => {
        const element = document.getElementById(pathstate);
        if (element) {
            element.scrollIntoView();
        }
    }, [pathstate]);


    const login =()=>{
        navigate("/login")
    }

    const logOut = () =>{

        localStorage.clear();
        setUser(null)
        navigate("/login")
    }

    const booking = ()=>{
        navigate("/reservations")
    }

     

    return (
        <Navbar expanded={expand} fixed="top" expand="md" className={'navbar'}>
            <Container>
                <Navbar.Brand href="/">
                    <span className="log">Cinema lk</span>
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="responsive-navbar-nav"
                    onClick={() => setexpand(expand ? false : 'expanded')}>
                    <span></span>
                    <span></span>
                    <span></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto" defaultActiveKey="#home" id="items">
                        <Nav.Item>
                            <Nav.Link onClick={(() => setexpand(false), () => setpathstate('#home'))}>
                                <p /> Home
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={(() => setexpand(false), () => setpathstate('#movies'))}>
                                <p /> Movies
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={booking}>
                                <p />  Bookings
                            </Nav.Link>
                        </Nav.Item>
                        {user?( 
                        <>
                        <Nav.Item>
                            <Link to="/cart"><button className="cart-icon"><ShoppingCartOutlinedIcon /></button></Link>
                        </Nav.Item>
                       <Nav.Item>
                            <button className="logBtn" onClick={logOut}>LogOut</button>
                        </Nav.Item>
                        </>
                        ):(<Nav.Item>
                            <button className="logBtn" onClick={login}>Login</button>
                        </Nav.Item>)}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
