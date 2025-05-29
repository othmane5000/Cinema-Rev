import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styles from './LoginPage.module.css';
import axios from "./axios"; // ← ton instance axios configurée

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get("/utilisateurs");
      const utilisateurs = res.data;

      // Trouver l'utilisateur par email
      const utilisateur = utilisateurs.find(
        (u) => u.email === formData.email
      );

      if (!utilisateur) {
        alert("Email non trouvé");
        return;
      }

      // Vérification simple du mot de passe (⚠️ pour test uniquement)
      if (formData.password.length < 6) {
        alert("Mot de passe invalide (trop court)");
        return;
      }

      // Enregistrement dans localStorage
      localStorage.setItem("user", JSON.stringify({
        id: utilisateur.id,
        nom: utilisateur.nom,
        email: utilisateur.email,
        role: utilisateur.role.nom
      }));

      // Redirection selon le rôle
      if (utilisateur.role.nom === "admin") {
        navigate("/admin");
      } else {
        navigate("/explore");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      alert("Erreur de connexion");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.header}>
        <div className={styles.logo}>🎬 CinemaRev</div>
      </div>

      <div className={styles.loginBox}>
        <h2><i>Connexion</i></h2>
        <form onSubmit={handleLogin}>
          <div className={styles.inputContainer}>
            <label>Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className={styles.inputContainer}>
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className={styles.eyeButton}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          <button type="submit" className={styles.loginButton}>
            Se connecter
          </button>
        </form>

        <div className={styles.signupLink}>
          <p><ins>New to CinemaRev? </ins><br />
            <a href="/register">Create your CinemaRev account</a></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
