import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../validation/auth";
import { useAuth } from "../context/authContext";
import styles from "./sup.module.css";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Buttons"; 


const SignUpForm = () => {
  const navigate = useNavigate();
  const { signUp, loading: authLoading, error: authError } = useAuth();
    const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    try {
      await signUp({
        userName: data.userName,
        email: data.email,
        password: data.password,
        cPassword: data.cPassword,
      });
      toast.success('Signup successful!');
      navigate('/login');
      // Redirect here if needed
    } catch (error) {
      toast.error('Signup failed. Please check your input.');
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
          <label htmlFor="userName" className={styles.label}>Username</label>
          <input id="userName" type="text" {...register("userName")} className={styles.input} />
          {errors.userName && <p className={styles.errorMessage}>{errors.userName.message}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input id="email" type="email" {...register("email")} className={styles.input} />
          {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input id="password" type="password" {...register("password")} className={styles.input} />
          {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="cPassword" className={styles.label}>Confirm Password</label>
          <input id="cPassword" type="password" {...register("cPassword")} className={styles.input} />
          {errors.cPassword && <p className={styles.errorMessage}>{errors.cPassword.message}</p>}
        </div>

        {authError && <div className={styles.error}>{authError}</div>}

        <button type="submit" disabled={authLoading} className={styles.button}>
          {authLoading ? "Signing up..." : "Sign Up"}
        </button>
        <p className={styles.redirectText}>
          Already have an account? <a href="/login" className={styles.redirectLink}>Login</a></p>
      </form>
    </div>
  </div>
);

};

export default SignUpForm;
