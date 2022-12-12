import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    navigate('login');
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {localStorage.getItem('userId') && <Button onClick={logOut}>Выйти</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
