import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OK, z } from "zod";
import styles from "./styles/ForgotPassword.module.css";
import { useAuth } from "../context/authContext";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const resetPasswordSchema = z
  .object({
    code: z.string(),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const ResetPassword = () => {
  const { forgetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!email) {
      navigate("/sendcode", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (success) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/login");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [success, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async data => {
    setLoading(true);
    setError(null);

    try {
      const response = await forgetPassword(email, data.code, data.newPassword);
      console.log(response);
      if (response.message === "Done ") {
        setSuccess(true);
      } else {
        throw new Error("Password reset failed");
      }
    } catch (err) {
      setError(err.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Reset Password</h2>
        <p className={styles.subtitle}>
          A verification code has been sent to <strong>{email}</strong>
        </p>
      </div>

      {error && (
        <div className={`${styles.message} ${styles.error}`}>
          <svg className={styles.icon} viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
            />
          </svg>
          {error}
        </div>
      )}

      {success ? (
        <div className={`${styles.message} ${styles.success}`}>
          <svg className={styles.icon} viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
            />
          </svg>
          Password reset successfully! Redirecting to login in {countdown}{" "}
          seconds...
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="code" className={styles.label}>
              Verification Code
            </label>
            <input
              id="code"
              type="text"
              inputMode="numeric"
              className={`${styles.input} ${errors.code ? styles.error : ""}`}
              {...register("code")}
              disabled={loading}
              placeholder="Enter 6-digit code"
            />
            {errors.code && (
              <p className={styles.errorText}>{errors.code.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="newPassword" className={styles.label}>
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              className={`${styles.input} ${
                errors.newPassword ? styles.error : ""
              }`}
              {...register("newPassword")}
              disabled={loading}
              placeholder="Enter new password"
            />
            {errors.newPassword && (
              <p className={styles.errorText}>{errors.newPassword.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className={`${styles.input} ${
                errors.confirmPassword ? styles.error : ""
              }`}
              {...register("confirmPassword")}
              disabled={loading}
              placeholder="Re-enter new password"
            />
            {errors.confirmPassword && (
              <p className={styles.errorText}>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`${styles.submitButton} ${
              loading ? styles.loading : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className={styles.spinner}></span>
                Resetting Password...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
