import React, { useState } from "react";
import axios from "./axios";
import styles from "./AjouterFilm.module.css";

const AjouterFilm = () => {
  const [formData, setFormData] = useState({
    titre: "",
    genre: "",
    date_sortie: "",
    bande_annonce: "",
    url_affiche: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/films", formData);
      alert("🎉 Film ajouté avec succès !");
      setFormData({
        titre: "", genre: "", date_sortie: "", bande_annonce: "", url_affiche: "", description: ""
      });
    } catch (err) {
      console.error(err);
      alert("❌ Erreur lors de l'ajout.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>➕ Ajouter un film</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" name="titre" placeholder="Titre" value={formData.titre} onChange={handleChange} required />
        <input type="text" name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} required />
        <input type="date" name="date_sortie" value={formData.date_sortie} onChange={handleChange} required />
        <input type="url" name="bande_annonce" placeholder="Lien bande-annonce" value={formData.bande_annonce} onChange={handleChange} />
        <input type="url" name="url_affiche" placeholder="Lien image affiche" value={formData.url_affiche} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
        <button type="submit" className={styles.btn}>Ajouter</button>
      </form>
    </div>
  );
};

export default AjouterFilm;
