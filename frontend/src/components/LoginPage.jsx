import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(''),
  email: yup.string().email('Invalid email').required(''),
});

const LoginPage = () => (
  <div>
    <h1>Войти</h1>
    <Formik
      initialValues={{
        name: '',
        email: '',
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form>
        <Field id="name" name="name" />
        <Field id="email" name="email" type="email" />
        <button type="submit">Войти</button>
      </Form>
    </Formik>
  </div>
);

export default LoginPage;
