import styles from "./styles/profile.module.css";
import { useAuth } from "../../context/authContext";
import Spinner from "../../components/shared/Spinner";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

function Profile() {
  useDocumentTitle("Profile");
  const { user, loading } = useAuth();

  // Add better error handling
  if (loading) return <Spinner />;
  if (!user?.user) return <p>No user found</p>;

  // Destructure user data
  const { userName, email } = user.user;

  return (
    <div className={styles.profilePage}>
      <div className={`${styles.profileContainer} ${styles.neonAnimation}`}>
        <div className={styles.profileContent}>
          <h2>User Profile</h2>
          <img
            src="../../src/assets/person_icon.png"
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