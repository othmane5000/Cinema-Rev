// ModifierFilm.jsx
import React, { useEffect, useState } from "react";
import axios from "./axios";
import styles from "./ModifierFilm.module.css";

const ModifierFilm = () => {
  const [films, setFilms] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState({
    titre: "",
    genre: "",
    date_sortie: "",
    bande_annonce: "",
    url_affiche: "",
    description: ""
  });

  useEffect(() => {
    axios.get("/films").then((res) => setFilms(res.data));
  }, []);

  useEffect(() => {
    if (selectedId) {
      const film = films.find(f => f.id === parseInt(selectedId));
      if (film) {
        setFormData({
          titre: film.titre,
          genre: film.genre,
          date_sortie: film.date_sortie,
          bande_annonce: film.bande_annonce,
          url_affiche: film.url_affiche,
          description: film.description
        });
      }
    }
  }, [selectedId, films]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedId) return alert("Veuillez sélectionner un film.");

    try {
      await axios.put(`/films/${selectedId}`, formData);
      alert("Film modifié avec succès !");
    } catch (error) {
      console.error("Erreur modification film:", error);
      alert("Erreur lors de la modification");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>✏️ Modifier un film</h2>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        className={styles.select}
      >
        <option value="">-- Sélectionnez un film --</option>
        {films.map(f => (
          <option key={f.id} value={f.id}>{f.titre}</option>
        ))}
      </select>

      {selectedId && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" name="titre" value={formData.titre} onChange={handleChange} placeholder="Titre" required />
          <input type="text" name="genre" value={formData.genre} onChange={handleChange} placeholder="Genre" required />
          <input type="date" name="date_sortie" value={formData.date_sortie} onChange={handleChange} required />
          <input type="text" name="bande_annonce" value={formData.bande_annonce} onChange={handleChange} placeholder="Lien bande-annonce" required />
          <input type="text" name="url_affiche" value={formData.url_affiche} onChange={handleChange} placeholder="Lien image" required />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
          <button type="submit" className={styles.submit}>✅ Enregistrer les modifications</button>
        </form>
      )}
    </div>
  );
};

export default ModifierFilm;
