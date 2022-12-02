import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Form, FloatingLabel, Button,
} from 'react-bootstrap';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      name: yup.string().required('Обязательно'),
      password: yup.string().required('Обязательно'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
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
      </FloatingLabel>
      <Button type="submit" className="w-100 mb-3" variant="outline-primary">Войти</Button>
    </Form>
  );
};

export default LoginPage;
