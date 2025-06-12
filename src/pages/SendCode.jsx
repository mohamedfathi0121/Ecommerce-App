import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./SignInForm.module.css";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const SendCode = () => {
  // Remove onEmailSubmit prop
  const { sendCode } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async data => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await sendCode(data.email);
      setSuccess(true);
      // Navigate with email in state
      setTimeout(() => {
        navigate("/forgetpassword", {
          state: { email: data.email },
        });
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to send code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <h2 className={styles.title}>Reset Password</h2>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>Code sent successfully!</p>}
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
        <p className={styles.redirectText}>
          Already have an account?{" "}
          <Link to="/login" className={styles.redirectLink}>
            Login
          </Link>
        </p>
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Sending..." : "Send Reset Code"}
        </button>
      </form>
    </div>
  );
};

export default SendCode;
