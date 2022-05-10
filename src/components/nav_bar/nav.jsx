import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './nav.scss';
import { Link } from 'react-router-dom';


const Navigation = () => {
    const [expand, setexpand] = React.useState(false);
    const [pathstate, setpathstate] = React.useState('#home');

    window.onscroll = function () {
        if (window.pageYOffset === 0) {
            setpathstate('#home');
        }
    };

    let itemCount = 0;

    React.useEffect(() => {
        const element = document.getElementById(pathstate);
        if (element) {
            element.scrollIntoView();
        }
    }, [pathstate]);

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
                            <Nav.Link onClick={(() => setexpand(false), () => setpathstate('#faq'))}>
                                <p />  Theaters
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/cart"><button className="cart-icon"><ShoppingCartOutlinedIcon /></button></Link>
                        </Nav.Item>
                        <Nav.Item>
                            <button className="logBtn">Login</button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
