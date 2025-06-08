import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "../styles/Register.module.css";
import signupImage from "../assets/signup.png"; 

export default function Register() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      phone: Yup.string().required("Required"),
      password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
      terms: Yup.boolean().oneOf([true], "You must accept the terms"),
    }),
    onSubmit: (values) => {
      console.log(values);
     
      localStorage.setItem("user", JSON.stringify(values));
     
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={signupImage} alt="Sign up illustration" />
      </div>
      <div className={styles.right}>
        <h2>Sign up</h2>
        <p className={styles.subtitle}>
          Let's get you all set up so you can access your personal account.
        </p>

        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div className={styles.doubleInput}>
            <div>
              <input
                name="firstName"
                placeholder="First Name"
                onChange={formik.handleChange}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <span className={styles.error}>{formik.errors.firstName}</span>
              )}
            </div>
            <div>
              <input
                name="lastName"
                placeholder="Last Name"
                onChange={formik.handleChange}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <span className={styles.error}>{formik.errors.lastName}</span>
              )}
            </div>
          </div>

          <div className={styles.doubleInput}>
            <div>
              <input
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email && (
                <span className={styles.error}>{formik.errors.email}</span>
              )}
            </div>
            <div>
              <input
                name="phone"
                placeholder="Phone Number"
                onChange={formik.handleChange}
              />
              {formik.touched.phone && formik.errors.phone && (
                <span className={styles.error}>{formik.errors.phone}</span>
              )}
            </div>
          </div>

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password && (
            <span className={styles.error}>{formik.errors.password}</span>
          )}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={formik.handleChange}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <span className={styles.error}>{formik.errors.confirmPassword}</span>
          )}

          <label className={styles.terms}>
            <input
              type="checkbox"
              name="terms"
              onChange={formik.handleChange}
            />
            I agree to all the <a href="#">Terms</a> and <a href="#">Privacy Policies</a>
          </label>
          {formik.touched.terms && formik.errors.terms && (
            <span className={styles.error}>{formik.errors.terms}</span>
          )}

          <button type="submit" className={styles.submitBtn}>
            Create account
          </button>

          <p className={styles.loginLink}>
            Already have an account? <a href="/login">Login</a>
          </p>

          <div className={styles.social}>
            <button className={styles.socialBtn}>🔵 Facebook</button>
            <button className={styles.socialBtn}>🟥 Google</button>
            <button className={styles.socialBtn}>⚫ Apple</button>
          </div>
        </form>
      </div>
    </div>
  );
}
