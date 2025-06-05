import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';
import { useNavigate } from 'react-router-dom'; // ← أضف هذا

export default function Register() {
  const navigate = useNavigate(); // ← استخدمه

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    address: Yup.string().required('Address is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      address: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push(values);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registration successful!');
      formik.resetForm();

      // 👇 Redirect to login page
      navigate('/login');
    },
  });
  return (
    <div className="register-bg">
      <div className="form-container shadow-lg p-4 rounded bg-white">
        <h3 className="text-center mb-4">Register</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="invalid-feedback">{formik.errors.name}</div>
            )}
          </div>

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

          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              className={`form-control ${formik.touched.address && formik.errors.address ? 'is-invalid' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
            {formik.touched.address && formik.errors.address && (
              <div className="invalid-feedback">{formik.errors.address}</div>
            )}
          </div>

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

          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
}
