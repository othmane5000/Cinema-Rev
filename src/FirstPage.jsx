import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from "./FirstPage.module.css";

export default function FirstPage() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login'); 
  };
  const goToRegister = () => {
    navigate('/register'); 
  };
  const goToExplore = () => {
    navigate('/explore');
  };

  return (
    <div className={styles.firstPage}>
      <header className={styles.banner}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>🎬 CinemaRev</div>
          <div className={styles.authButtons}>
            <button className={styles.btn} onClick={goToRegister}>Register</button>
            <button className={styles.btn} onClick={goToLogin}>Login</button>
          </div>
        </nav>

        <div className={styles.bannerContent}>
          <div className={styles.hero}>
            <h1>Your Personal <span className={styles.highlight}>Cinema</span> Companion</h1>
            <p>Discover, track, and enjoy your favorite movies with CinemaRev</p>
            <p><i>Where opinions meet the magic of movies.</i></p>
            <button className={styles.exploreBtn} onClick={goToExplore}>Start Exploring</button>
          </div>
        </div>
      </header>
    </div>
  );
}
