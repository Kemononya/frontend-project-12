import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Form, FloatingLabel, Button, Container, Row, Col, Card, Image,
} from 'react-bootstrap';
import axios from 'axios';
import routes from '../routes';
import image from '../assets/RegisterImg.jpg';
import Header from './Header';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup.string().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов').required('Обязательное поле'),
      password: yup.string().min(6, 'Не менее 6 символов').required('Обязательное поле'),
      confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли должны совпадать'),
    }),
    onSubmit: async ({ username, password }) => {
      try {
        setSubmitting(true);
        const { data } = await axios.post(routes.signUpPath(), { username, password });
        localStorage.setItem('userId', data.token);
        localStorage.setItem('username', data.username);
        setSubmitting(false);
        setError(false);
        navigate('/');
      } catch (err) {
        setSubmitting(false);
        console.error(err.message);
        if (err.response.status === 409) {
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
                  <h1 className="text-center mb-4">Регистрация</h1>
                  <FloatingLabel
                    controlId="username"
                    label="Имя пользователя"
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      ref={inputRef}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      name="username"
                      placeholder="Имя пользователя"
                      isInvalid={formik.touched.username && formik.errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.username}
                    </Form.Control.Feedback>
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
                      isInvalid={formik.touched.password && formik.errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="confirmPassword"
                    label="Подтвердите пароль"
                    className="mb-4"
                  >
                    <Form.Control
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      name="confirmPassword"
                      type="password"
                      placeholder="Подтвердите пароль"
                      isInvalid={formik.errors.confirmPassword || error}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.confirmPassword || 'Такой пользователь уже существует'}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <Button
                    type="submit"
                    className="w-100 mb-3"
                    variant="outline-primary"
                    disabled={isSubmitting}
                  >
                    Зарегистрироваться
                  </Button>
                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;
