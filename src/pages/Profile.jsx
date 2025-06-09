import { useState } from 'react';
import styles from "./styles/profile.module.css";
import { useAuth } from "../context/authContext";
import Spinner from "../components/shared/Spinner";

function Profile() {
  const { user, loading } = useAuth();
  const [activeAnimation, setActiveAnimation] = useState('float');

  if (loading) return <Spinner />;
  if (!user) return null;

  const animationClasses = {
    float: styles.floatingAnimation,
    gradient: styles.gradientAnimation,
    neon: styles.neonAnimation,
    tilt: styles.tiltAnimation,
    bounce: styles.bounceAnimation,
    wave: styles.waveAnimation
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.animationSelector}>
        <h3>Profile Animation Style</h3>
        <div className={styles.buttons}>
          {Object.keys(animationClasses).map(anim => (
            <button
              key={anim}
              onClick={() => setActiveAnimation(anim)}
              className={activeAnimation === anim ? styles.activeButton : ''}
            >
              {anim.charAt(0).toUpperCase() + anim.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className={`${styles.profileContainer} ${animationClasses[activeAnimation]}`}>
        <div className={styles.profileContent}>
          <h2>User Profile</h2>
          <img
            src="../../src/assets/person_icon.png"
            alt="Profile"
            className={styles.profileImage}
          />
          <div className={styles.userInfo}>
            <h3>{user.user.userName}</h3>
            <h4>{user.user.email}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;