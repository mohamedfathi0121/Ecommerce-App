// src/components/auth/SignInForm.js
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../validation/auth";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import styles from "./SignInForm.module.css";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const navigate = useNavigate();
  const { signIn, loading: authLoading, error: authError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async data => {
    try {
      await signIn({
        email: data.email,
        password: data.password,
      });
      toast.success("Signed in successfully!");
      navigate("/");
      // Optional: redirect here
    } catch (error) {
      toast.error("Sign in failed.");
      if (error.fieldErrors) {
        Object.entries(error.fieldErrors).forEach(([field, message]) => {
          setFormError(field, { type: "manual", message });
        });
      }
    }
  };
return (
  <div className={styles.loginBg}>
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={styles.input}
          />
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className={styles.input}
          />
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password.message}</p>
          )}
        </div>

        {authError && <div className={styles.error}>{authError}</div>}

        <button type="submit" disabled={authLoading} className={styles.button}>
          {authLoading ? "Signing in..." : "Sign In"}
        </button>
        <p className={styles.redirectText}>
          Don't have an account?{" "}
          <a href="/register" className={styles.redirectLink}>
            Sign Up
          </a></p>
      </form>
    </div>
  </div>
);

};

export default SignInForm;
