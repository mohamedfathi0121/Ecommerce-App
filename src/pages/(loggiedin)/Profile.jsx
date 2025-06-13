import styles from "./styles/profile.module.css";
import { useAuth } from "../../context/authContext";
import Spinner from "../../components/shared/Spinner";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import profileImage from "../../assets/person_icon.png"

function Profile() {
  useDocumentTitle("Profile");
  const { user, loading} = useAuth();
  // Add better error handling
  if (loading) return <Spinner />;
  if (!user) return <p>No user found</p>;

  // Destructure user data
  const { userName, email } = user || {};

  return (
    <div className={styles.profilePage}>
      <div className={`${styles.profileContainer} ${styles.neonAnimation}`}>
        <div className={styles.profileContent}>
          <h2>User Profile</h2>
          <img
            src={profileImage}
            alt="Profile"
            className={styles.profileImage}
          />
          <div className={styles.userInfo}>
            <h3>{userName}</h3>
            <h4>{email}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;