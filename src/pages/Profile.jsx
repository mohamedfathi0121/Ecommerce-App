import styles from "./styles/profile.module.css";
import { useAuth } from "../context/authContext";
import { Spinner } from "react-bootstrap";

function Profile() {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  if (!user) return null;

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <h2>Profile</h2>
        <img
          src="../../src/assets/person_icon.png"
          alt="Profile"
          className={styles.profileImage}
        />
        <p>Name: John Doe</p>
        <p>Email: 5vH5E@example.com</p>
      </div>
    </div>
  );
}

export default Profile;
