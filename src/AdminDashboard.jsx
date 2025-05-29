// AdminDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  if (!user || user.role !== "admin") {
    navigate("/login");
    return null;
  }

  const goToAddFilm = () => navigate("/admin/ajouter-film");
  const goToDeleteFilm = () => navigate("/admin/supprimer-film");
  const goToEditFilm = () => navigate("/admin/modifier-film");


  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.title}>🎬 Panneau d'administration</h1>
      <p>Bienvenue, {user.nom} !</p>

      <div className={styles.actions}>
        <button onClick={goToAddFilm} className={styles.btn}>➕ Ajouter un film</button>
        <button onClick={goToEditFilm} className={styles.btn}>✏️ Modifier un film</button>
        <button onClick={goToDeleteFilm} className={styles.btn}>🗑️ Supprimer un film</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
