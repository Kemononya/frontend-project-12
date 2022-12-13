import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Form, FloatingLabel, Button, Container, Row, Col, Card, Image,
} from 'react-bootstrap';
import axios from 'axios';
import routes from '../routes';
import image from '../assets/LoginImg.jpg';
import Header from './Header';

const LoginPage = () => {
  const navigate = useNavigate();
  const [error401, setError] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ username, password }) => {
      try {
        setSubmitting(true);
        const { data } = await axios.post(routes.loginPath(), { username, password });
        localStorage.setItem('userId', data.token);
        localStorage.setItem('username', data.username);
        setError(false);
        setSubmitting(false);
        navigate('/');
      } catch (err) {
        setSubmitting(false);
        console.error(err.message);
        if (err.response.status === 401) {
          setError(true);
        }
      }
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Container className="h-100" fluid>
        <Row className="justify-content-center align-content-center h-100">
          <Col xs={12} md={8} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body as={Row} className="p-5">
                <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                  <Image roundedCircle src={image} alt="Войти" />
                </Col>
                <Col as={Form} xs={12} md={6} className="mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">Войти</h1>
                  <FloatingLabel
                    controlId="username"
                    label="Ваше имя"
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      ref={inputRef}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      name="username"
                      placeholder="Ваше имя"
                      isInvalid={error401}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="password"
                    label="Пароль"
                    className="mb-4"
                  >
                    <Form.Control
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      name="password"
                      type="password"
                      placeholder="Пароль"
                      isInvalid={error401}
                    />
                    <Form.Control.Feedback type="invalid">
                      Неверные имя пользователя или пароль
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <Button
                    type="submit"
                    className="w-100 mb-3"
                    variant="outline-primary"
                    disabled={isSubmitting}
                  >
                    Войти
                  </Button>
                </Col>
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>Нет аккаунта?</span>
                  {' '}
                  <a href="/signup">Регистрация</a>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
