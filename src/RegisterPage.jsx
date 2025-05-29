import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from './RegisterPage.module.css';
import axios from "./axios"; // ← notre instance Axios

function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rePassword: ''
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.rePassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await axios.post("/utilisateurs", {
        nom: formData.name,
        email: formData.email,
        mot_de_passe: formData.password,
        id_role: 2 // Client par défaut
      });

      // Stocker l’utilisateur dans localStorage
      localStorage.setItem("user", JSON.stringify(response.data));

      navigate("/explore");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création du compte");
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.header}>
        <div className={styles.logo}>🎬 CinemaRev</div>
      </div>

      <div className={styles.registerBox}>
        <h2>Create account</h2>
        <form onSubmit={handleRegister}>
          <div className={styles.inputContainer}>
            <label>Your name</label>
            <input
              type="text"
              required
              placeholder="First and last name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
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
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Re-enter password</label>
            <input
              type={showRePassword ? "text" : "password"}
              required
              value={formData.rePassword}
              onChange={(e) => setFormData({ ...formData, rePassword: e.target.value })}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowRePassword(!showRePassword)}
            />
          </div>

          <button type="submit" className={styles.registerButton}>
            Create your CinemaRev account
          </button>
        </form>

        <div className={styles.signinLink}>
          Already have an account? <a href="/login">Sign in</a>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
