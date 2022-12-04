import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Form, FloatingLabel, Button, Container, Row,
} from 'react-bootstrap';
import axios from 'axios';
import routes from '../routes';

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ username, password }) => {
      try {
        const { data } = await axios.post(routes.loginPath(), { username, password });
        localStorage.setItem('userId', data.token);
        setError(false);
        navigate('/');
      } catch (err) {
        setError(true);
        console.error(err.message);
      }
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
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
            />
            {error && <Form.Text className="text-danger">Неверные имя пользователя или пароль</Form.Text>}
          </FloatingLabel>
          <Button type="submit" className="w-100 mb-3" variant="outline-primary">Войти</Button>
        </Form>
      </Row>
    </Container>
  );
};

export default LoginPage;
