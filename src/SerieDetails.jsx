import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "./axios";
import styles from "./FilmDetails.module.css";

const SerieDetails = () => {
  const { id } = useParams();
  const [serie, setSerie] = useState(null);
  const [userRating, setUserRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`/series/${id}`)
      .then((res) => setSerie(res.data))
      .catch((err) => console.error("Erreur chargement série :", err));
  }, [id]);

  // Charger les avis depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`serie-reviews-${id}`);
    if (saved) setReviews(JSON.parse(saved));
  }, [id]);

  // Sauvegarder avis dans localStorage
  useEffect(() => {
    localStorage.setItem(`serie-reviews-${id}`, JSON.stringify(reviews));
  }, [reviews, id]);

  const handleAddReview = () => {
    if (!reviewText.trim()) return;

    const newReview = {
      id: Date.now(),
      text: reviewText,
      rating: userRating,
    };
    setReviews([newReview, ...reviews]);
    setReviewText("");
    setUserRating("");
  };

  const handleDeleteReview = (reviewId) => {
    setReviews(reviews.filter((r) => r.id !== reviewId));
  };

  if (!serie) return <p>Série introuvable</p>;

  return (
    <div className={styles.detailsContainer}>
      <h1 className={styles.title}>{serie.titre}</h1>

      <div className={styles.trailer}>
        <iframe
          width="100%"
          height="400"
          src={serie.bande_annonce}
          title={serie.titre}
          allowFullScreen
        />
      </div>

      <p className={styles.description}>{serie.description}</p>
      <p className={styles.rating}>🎭 Genre : {serie.genre}</p>

      {/* Ajout d’un avis */}
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
        <button onClick={handleAddReview} className={styles.button}>
          ➕ Ajouter Review
        </button>
      </div>

      {/* Affichage des avis */}
      <div className={styles.allReviews}>
        <h2>Reviews des utilisateurs</h2>
        {reviews.length === 0 ? (
          <p>Aucune review pour cette série.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className={styles.review}>
              <p>⭐ {review.rating}/10</p>
              <p>{review.text}</p>
              <button
                onClick={() => handleDeleteReview(review.id)}
                className={styles.deleteButton}
              >
                ❌ Supprimer
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SerieDetails;
