
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./Login.module.css";
import loginImage from "../assets/login.png";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6, "Min 6 characters").required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Login Data:", values);
      navigate("/dashboard"); 
    },
  });

  return (

    <div className={styles.container}>
      <div className={styles.left}>
        <img src={loginImage} alt="Login illustration" />
      </div>

      <div className={styles.right}>
        <h2>Login</h2>
        <p>Login to access your account</p>


        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && <div className={styles.error}>{formik.errors.email}</div>}

          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && <div className={styles.error}>{formik.errors.password}</div>}

          <button type="submit" className={styles.loginBtn}>Login</button>

          <p className={styles.switch}>
            Don’t have an account?{" "}
            <span onClick={() => navigate("/register")}>Sign up</span>
          </p>
        </form>
      </div>
    </div>
  );
}
