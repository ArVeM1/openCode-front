import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";
import root from './header.module.scss'

const Header = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand><Link to={"/"} className={root.logo}>AmirLogo</Link></Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link>
                            <Link to={"/statement"} className={root.link}>Журнал</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to={"/map"} className={root.link}>Карта</Link>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

        </>
    );
};

export default Header;