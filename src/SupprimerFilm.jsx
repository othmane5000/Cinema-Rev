import React, { useEffect, useState } from "react";
import axios from "./axios";
import styles from "./SupprimerFilm.module.css";

const SupprimerFilm = () => {
  const [films, setFilms] = useState([]);

  const chargerFilms = async () => {
    try {
      const res = await axios.get("/films");
      setFilms(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    chargerFilms();
  }, []);

  const supprimerFilm = async (id) => {
    if (!window.confirm("Supprimer ce film ?")) return;

    try {
      await axios.delete(`/films/${id}`);
      setFilms(films.filter(f => f.id !== id));
      alert("Film supprimé !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>🗑️ Supprimer un film</h1>
      <div className={styles.filmList}>
        {films.map((film) => (
          <div key={film.id} className={styles.filmCard}>
            <img src={film.url_affiche} alt={film.titre} className={styles.poster} />
            <h3>{film.titre}</h3>
            <p>{film.genre}</p>
            <button onClick={() => supprimerFilm(film.id)} className={styles.btn}>Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupprimerFilm;
