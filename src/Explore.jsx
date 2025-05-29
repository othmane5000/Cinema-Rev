import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Explore.module.css";
import axios from "./axios";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';


const Explore = () => {
  const [films, setFilms] = useState([]);
  const [series, setSeries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get("/films")
      .then((res) => setFilms(res.data))
      .catch((err) => console.error("Erreur films:", err));

    axios.get("/series")
      .then((res) => setSeries(res.data))
      .catch((err) => console.error("Erreur séries:", err));
  }, []);

  const handleAddToWatchlist = async (item, type) => {
    if (!user) return alert("Veuillez vous connecter");

    console.log("📤 Ajout watchlist :", {
      id_utilisateur: user.id,
      id_film: item.id,
      type: type
    });

    try {
      await axios.post("/watchlists", {
        id_utilisateur: user.id,
        id_film: item.id,
        type: type, // ✅ Important
        date_consultation: null
      });

      alert(`${item.titre} ajouté à la watchlist`);
    } catch (error) {
      console.error("Erreur ajout watchlist:", error);
      alert("Erreur lors de l’ajout à la watchlist");
    }
  };

  const filteredFilms = films.filter((film) =>
    film.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSeries = series.filter((serie) =>
    serie.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Rechercher un film ou une série..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchBar}
        />
        <Link to="/watchlist" className={styles.watchlistLink}>➕ Voir la Watchlist</Link>
        <Link to="/profile" className={styles.watchlistLink}>👤 Profil</Link>
      </div>

      <div className={styles.exploreContainer}>
        <div className={styles.logo}>🎬 CinemaRev</div>

        {/* 🎥 FILMS */}
        <h1 className={styles.exploreTitle}>Top Picks</h1>
        <div className={styles.filmGrid}>
          {filteredFilms.map((film) => (
            <div className={styles.filmCard} key={`film-${film.id}`}>
              <img src={film.url_affiche} alt={film.titre} className={styles.filmImage} />
              <div className={styles.filmInfo}>
                <h3 className={styles.filmTitle}>{film.titre}</h3>
                <div className={styles.filmRating}>🎭 {film.genre}</div>
                <Link to={`/film/${film.id}`} className={styles.detailsButton}>
                  Voir plus
                </Link>
                <button
                  className={styles.detailsButton}
                  onClick={() => handleAddToWatchlist(film, "film")} // ✅ CORRECT
                >
                  ➕ Watchlist
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 📺 SERIES */}
        <h1 className={styles.exploreTitle}>Top Series</h1>
        <div className={styles.filmGrid}>
          {filteredSeries.map((serie) => (
            <div className={styles.filmCard} key={`serie-${serie.id}`}>
              <img src={serie.url_affiche} alt={serie.titre} className={styles.filmImage} />
              <div className={styles.filmInfo}>
                <h3 className={styles.filmTitle}>{serie.titre}</h3>
                <div className={styles.filmRating}>🎭 {serie.genre}</div>
                <Link to={`/serie/${serie.id}`} className={styles.detailsButton}>
                  Voir plus
                </Link>
                <button
                  className={styles.detailsButton}
                  onClick={() => handleAddToWatchlist(serie, "serie")} // ✅ C'EST LÀ
                >
                  ➕ Watchlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
<a
  href="https://wa.me/0700105033" // Remplace par ton numéro WhatsApp
  target="_blank"
  rel="noopener noreferrer"
  className={styles.whatsappButton}
>
  <FaWhatsapp />
</a>

       <footer className={styles.footer}>
  <div className={styles.footerContainer}>
    <div className={styles.footerSection}>
      <p className={styles.description}>
        Explorez, notez et partagez vos avis sur les meilleurs films et séries du moment.
      </p>
    </div>

    <div className={styles.footerSection}>
      <h3>Navigation</h3>
      <ul>
        <li><a href="/">Accueil</a></li>
        <li><a href="/films">Films/Séries</a></li>
        <li><a href="/whatiscinema">What is Cinema Rev ?</a></li>
         <li><a href="/faq">FAQ</a></li>
        <li><a href="/condition">Conditions of Use</a></li>
      </ul>
    </div>

    <div className={styles.footerSection}>
      <h3>Catégories</h3>
      <ul>
        <li><a href="#">Action</a></li>
        <li><a href="#">Drame</a></li>
        <li><a href="#">Science-fiction</a></li>
        <li><a href="#">Thriller</a></li>
      </ul>
    </div>
    <div className={styles.footerSection}>
      <h3>Suivez-nous</h3>
      <div className={styles.socialIcons}>
  <a href="#"><FaFacebookF /></a>
  <a href="#"><FaTwitter /></a>
  <a href="#"><FaInstagram /></a>
  <a href="#"><FaYoutube /></a>
    <a href="#">< FaWhatsapp/></a>

</div>
    </div>
  </div>
  <div className={styles.footerBottom}>
    &copy; 2025 CinemaRev. Tous droits réservés.
  </div>
</footer>

    </>
  );
};

export default Explore;
