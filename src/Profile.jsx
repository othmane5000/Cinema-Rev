import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";
import axios from "./axios";
import { useNavigate} from "react-router-dom";


const Profile = () => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

const handleRetour = () => {
  navigate("/explore");
};


  useEffect(() => {
    if (!localUser) return;
    axios.get(`/utilisateurs/${localUser.id}`)
      .then(res => setUser(res.data))
      .catch(err => {
        console.error("Erreur chargement profil :", err);
        setUser(null);
      });
  }, [localUser]);

  const handleDeleteProfile = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  if (!user) {
    return (
      <div className={styles.profilePage}>
        <div className={styles.profileHeader}>
          <div className={styles.logo}>🎬 CinemaRev</div>
          <Link to="/watchlist">
            <button className={styles.watchlistButton}>🎥 Watchlist</button>
          </Link>
         

        </div>
        <div className={styles.profileContainer}>
          <h1 className={styles.profileTitle}>👤 Profil</h1>
          <p className={styles.profileDetail}>Aucun utilisateur connecté.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileHeader}>
        <div className={styles.logo}>🎬 CinemaRev</div>
        <Link to="/watchlist">
          <button className={styles.watchlistButton}>🎥 Watchlist</button>
        </Link>
      </div>

      <div className={styles.profileContainer}>
        <h1 className={styles.profileTitle}>👤 Mon Profil</h1>
        <p className={styles.profileDetail}>
          <strong>Nom :</strong> {user.nom}
        </p>
        <p className={styles.profileDetail}>
          <strong>Email :</strong> {user.email}
        </p>
        <p className={styles.profileDetail}>
          <strong>Rôle :</strong> {user.role?.nom || "Client"}
        </p>

        <button
          className={styles.deleteProfileButton}
          onClick={handleDeleteProfile}
        >
          Supprimer le profil
        </button>
         <button className={styles.retourButton} onClick={handleRetour}>
  🔙 Retour à l'exploration
</button>
      </div>
    </div>
  );
};

export default Profile;
