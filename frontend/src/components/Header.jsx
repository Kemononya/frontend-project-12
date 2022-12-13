import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    navigate('login');
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Link className="navbar-brand" to="/">{t('header.link')}</Link>
        {localStorage.getItem('userId') && <Button onClick={logOut}>{t('header.btn')}</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
