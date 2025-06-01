import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./FilmDetails.module.css";
import axios from "./axios";

const FilmDetails = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [avis, setAvis] = useState([]);
  const [userRating, setUserRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [watchlist, setWatchlist] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get(`/films/${id}`).then(res => setFilm(res.data));
    axios.get(`/avis`).then(res =>
      setAvis(res.data.filter(a => a.id_film.toString() === id))
    );

    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
  }, [id]);

  const handleAddReview = async () => {
    if (!user || !reviewText.trim() || !userRating) return;

    try {
      const res = await axios.post("/avis", {
        id_utilisateur: user.id,
        id_film: parseInt(id),
        note: parseInt(userRating),
        commentaire: reviewText,
      });

      setAvis([res.data, ...avis]);
      setReviewText("");
      setUserRating("");
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'avis :", err);
    }
  };

  const handleAddToWatchlist = () => {
    if (!film) return;

    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    const alreadyInWatchlist = storedWatchlist.some(f => f.id === film.id);
    if (alreadyInWatchlist) return alert("Ce film est déjà dans votre watchlist.");

    const updatedWatchlist = [film, ...storedWatchlist];
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    setWatchlist(updatedWatchlist);
    alert("Film ajouté à votre watchlist !");
  };

  const handleDeleteReview = async (reviewId) => {
    await axios.delete(`/avis/${reviewId}`);
    setAvis(avis.filter(r => r.id !== reviewId));
  };
   
            const handleAddToWatchlist1 = async () => {
    if (!user) return alert("Veuillez vous connecter.");
  
    try {
      await axios.post("/watchlists", {
        id_utilisateur: user.id,
        id_film: film.id,
        type: "film", // ou "serie" selon le contexte
        date_consultation: null,
      });
  
      alert("Film ajouté à la watchlist.");
    } catch (err) {
      console.error("Erreur lors de l'ajout à la watchlist :", err);
      alert("Impossible d’ajouter à la watchlist.");
    }
  };



  if (!film) return <p>Chargement...</p>;

  return (
    <div className={styles.detailsContainer}>
      <h1 className={styles.title}>{film.titre}</h1>

      <div className={styles.trailer}>
        <iframe
          width="100%"
          height="400"
          src={film.bande_annonce || ""}
          title={film.titre}
          allowFullScreen
        />
      </div>

      <p className={styles.description}>{film.description || "Pas de description"}</p>
      <p className={styles.rating}>
        ⭐ Note globale : {film.avis_avg_note != null ? Number(film.avis_avg_note).toFixed(1) : 'N/A'} / 10
      </p>

      {user && (
        <div className={styles.reviewSection}>
          <h2>Votre avis</h2>
          <input
            type="number"
            placeholder="Votre note sur 10"
            max="10"
            min="0"
            value={userRating}
            onChange={(e) => setUserRating(e.target.value)}
            className={styles.input}
          />
          <textarea
            placeholder="Écrivez votre review ici..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className={styles.textarea}
          ></textarea>
          <div className={styles.buttonGroup}>
            <button onClick={handleAddReview} className={styles.button}>
              ➕ Ajouter Review
            </button>
           <button onClick={handleAddToWatchlist} className={`${styles.button} ${styles.watchlistButton}`}>
  📌 Ajouter à la watchlist
</button>
          </div>
        </div>
      )}

      <div className={styles.allReviews}>
        <h2>Reviews des utilisateurs</h2>
        {avis.length === 0 ? (
          <p>Aucune review pour ce film.</p>
        ) : (
          avis.map((review) => (
            <div key={review.id} className={styles.review}>
              <p>⭐ {review.note}/10</p>
              <p>{review.commentaire}</p>
              {user && user.id === review.id_utilisateur && (
                <button
                  onClick={() => handleDeleteReview(review.id)}
                  className={styles.deleteButton}
                >
                  ❌ Supprimer
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FilmDetails;
