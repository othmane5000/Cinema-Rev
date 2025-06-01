import React, { useEffect, useState } from "react";
import styles from "./Watchlist.module.css";
import axios from "./axios";
import { useNavigate } from "react-router-dom";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    axios.get(`/watchlists?id_utilisateur=${user.id}`)
      .then((res) => setWatchlist(res.data))
      .catch((err) => console.error("Erreur chargement watchlist :", err));
  }, [user]);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`/watchlists/${id}`);
      setWatchlist(watchlist.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Erreur suppression :", err);
      alert("Erreur lors de la suppression");
    }
  };

  const navigate = useNavigate();

const handleRetour = () => {
  navigate("/explore");
};


  return (
    <div className={styles.exploreContainer}>
      <div className={styles.logo}>🎬 CinemaRev</div>
      <h1 className={styles.exploreTitle}>🎞️ Ma Watchlist</h1>
      <button onClick={handleRetour} className={styles.retourButton}>
  🔙 Retour à l'exploration
</button>

      {watchlist.length === 0 ? (
        <p>😴 Aucun élément dans la watchlist.</p>
      ) : (
        <div className={styles.filmGrid}>
          {watchlist.map((item) => {
            const data = item.data;

            // Si data est null (film ou série supprimé)
            if (!data) {
              return (
                <div key={item.id} className={styles.filmCard}>
                  <div className={styles.filmInfo}>
                    <h3 className={styles.filmTitle}>Élément introuvable</h3>
                    <p style={{ color: "red" }}>Ce contenu a été supprimé.</p>
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemove(item.id)}
                    >
                      ❌ Supprimer
                    </button>
                  </div>
                </div>
              );
            }
  


            return (
              <div className={styles.filmCard} key={item.id}>
                <img
                  src={data.url_affiche}
                  alt={data.titre}
                  className={styles.filmImage}
                  onError={(e) => e.target.style.display = "none"}
                />
                <div className={styles.filmInfo}>
                  <h3 className={styles.filmTitle}>{data.titre}</h3>
                  <div className={styles.filmRating}>🎭 {data.genre}</div>
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemove(item.id)}
                  >
                    ❌ Supprimer
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
