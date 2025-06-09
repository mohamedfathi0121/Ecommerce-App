import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './styles/Login.module.css';
import { Link } from 'react-router-dom';




export default function Login() {
    

  const validationSchema = Yup.object({
    email: Yup.string("email must be a charcteres only and don't have space").email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      const users = JSON.parse(localStorage.getItem('users')) || [];

      const foundUser = users.find(
        user => user.email === values.email && user.password === values.password
      );

      if (foundUser) {
        alert('Login successful!');
        // redirect or do something else here
      } else {
        alert('Invalid email or password.');
      }

      formik.resetForm();
    },
  });

  return (
    <div className={style.loginBg}>
      <div className={`${style.formContainer} shadow-lg p-4 rounded bg-white`}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={formik.handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          <button type="submit" className="btn btn-success w-100">Login</button>
          <p className="mt-3 text-center">
  Don't have an account? <Link to="/register">Register</Link>

</p>

        </form>
      </div>
    </div>
  );
}
