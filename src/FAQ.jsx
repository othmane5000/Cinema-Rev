// src/FAQ.jsx
import React from "react";
import styles from "./FAQ.module.css";

export default function FAQ() {
  return (
    <div className={styles.container}>
      <h1>❓ Foire Aux Questions</h1>

      <section className={styles.section}>
        <h2>🎬 Qu’est-ce que CinemaRev ?</h2>
        <p>
          CinemaRev est une plateforme où vous pouvez découvrir les meilleurs films et séries,
          consulter les bandes-annonces, ajouter des titres à votre watchlist, et partager vos avis.
        </p>
      </section>

      <section className={styles.section}>
        <h2>📥 Comment créer un compte ?</h2>
        <p>
          Cliquez sur le bouton “Register” sur la page d’accueil et remplissez le formulaire avec votre nom, email et mot de passe. Vous pouvez ensuite explorer librement le contenu.
        </p>
      </section>

      <section className={styles.section}>
        <h2>🧾 Puis-je noter un film ou une série ?</h2>
        <p>
          Oui ! Accédez à la page d’un film ou d’une série et vous pourrez y laisser une note sur 10 ainsi qu’un commentaire personnel.
        </p>
      </section>

      <section className={styles.section}>
        <h2>📺 Quelle est la différence entre “film” et “série” ?</h2>
        <p>
          Les films sont des œuvres uniques avec une durée fixe, tandis que les séries sont composées de plusieurs épisodes répartis en saisons.
        </p>
      </section>

      <section className={styles.section}>
        <h2>🛡️ Mes données sont-elles sécurisées ?</h2>
        <p>
          Oui, nous utilisons des protocoles sécurisés pour protéger vos informations personnelles. Vos données ne sont jamais partagées sans votre consentement.
        </p>
      </section>

      <section className={styles.section}>
        <h2>📧 Je veux contacter l’équipe, comment faire ?</h2>
        <p>
          Vous pouvez nous écrire via notre page de contact ou envoyer un email à support@cinemarev.com.
        </p>
      </section>
    </div>
  );
}
