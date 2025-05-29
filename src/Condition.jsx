// src/Condition.jsx
import React from "react";
import styles from "./condition.module.css";

export default function Condition() {
  return (
    <div className={styles.container}>
      <h1>📜 Conditions Générales d'Utilisation</h1>

      <p>
        Bienvenue sur CinemaRev. En accédant à ce site ou en utilisant ses services, vous acceptez les conditions suivantes. Veuillez les lire attentivement.
      </p>

      <section className={styles.section}>
        <h2>1. Utilisation autorisée</h2>
        <p>
          Vous êtes autorisé à naviguer sur le site, à créer un compte personnel et à interagir avec le contenu
          (ex : ajouter à la watchlist, écrire un avis), uniquement à des fins personnelles et non commerciales.
        </p>
      </section>

      <section className={styles.section}>
        <h2>2. Compte utilisateur</h2>
        <p>
          Vous êtes responsable de la confidentialité de votre mot de passe. Toute activité effectuée avec votre compte est sous votre responsabilité.
        </p>
      </section>

      <section className={styles.section}>
        <h2>3. Propriété intellectuelle</h2>
        <p>
          Tous les contenus présents sur le site (images, vidéos, textes) sont protégés par les lois sur le droit d’auteur. Il est interdit de les copier ou de les réutiliser sans autorisation.
        </p>
      </section>

      <section className={styles.section}>
        <h2>4. Avis des utilisateurs</h2>
        <p>
          Les utilisateurs sont invités à partager leurs avis, mais tout contenu illégal, offensant ou diffamatoire sera supprimé et pourra entraîner la suspension du compte.
        </p>
      </section>

      <section className={styles.section}>
        <h2>5. Suspension de service</h2>
        <p>
          CinemaRev se réserve le droit de suspendre temporairement ou définitivement un compte utilisateur en cas de non-respect des présentes conditions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>6. Contact</h2>
        <p>
          Pour toute question ou réclamation, veuillez nous contacter à l’adresse suivante : contact@cinemarev.com.
        </p>
      </section>
    </div>
  );
}
