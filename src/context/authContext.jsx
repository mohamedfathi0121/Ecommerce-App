// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { 
  signUp as signUpService,
  signIn as signInService,
  sendCode as sendCodeService,
  forgetPassword as forgetPasswordService,
  verifyToken as verifyTokenService // Add this import
} from '../services/api/auth';
import { Navigate, useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const navigate = useNavigate();
  useEffect(() => {
    async function loadUser() {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Verify token with backend
          const userData = await verifyTokenService(token);
          console.log(userData);
          setUser(userData);
        }
      } catch (err) {
        console.error('Session load failed', err);
        // localStorage.removeItem('token');
        setError(err.message || 'Session expired');
      } finally {
        setLoading(false);
      }
    }
    
    loadUser();
  }, []);

  const signUp = async (userData) => {
    try {
      setLoading(true);
      const { user, token } = await signUpService(userData);
      localStorage.setItem('token', token);
      setUser(user);
      setError(null);
      toast.success('Account created successfully!');
      return user;
    } catch (err) {
      setError(err.message || 'Sign up failed');
      toast.error(err.message || 'Sign up failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (credentials) => {
    try {
      setLoading(true);
      const { user, token } = await signInService(credentials);
      localStorage.setItem('token', token);
      setUser(user);
      setError(null);
      toast.success('Logged in successfully!');
      return user;
    } catch (err) {
      setError(err.message || 'Sign in failed');
      toast.error(err.message || 'Sign in failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const sendCode = async (email) => {
    try {
      setLoading(true);
      const response = await sendCodeService(email);
      setError(null);
      toast.success('Verification code sent to your email');
      return response;
    } catch (err) {
      setError(err.message || 'Failed to send code');
      toast.error(err.message || 'Failed to send code');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const forgetPassword = async (data) => {
    try {
      setLoading(true);
      const response = await forgetPasswordService(data);
      setError(null);
      toast.success('Password reset successfully!');
      return response;
    } catch (err) {
      setError(err.message || 'Password reset failed');
      toast.error(err.message || 'Password reset failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    console.log('signOut');
    setUser(null);
    setError(null);
    toast.success('Logged out successfully');
    navigate('/'); 
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    signUp,
    signIn,
    signOut,
    sendCode,
    forgetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};