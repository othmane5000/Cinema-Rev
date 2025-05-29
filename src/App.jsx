// App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirstPage from './FirstPage.jsx';
import LoginPage from './LoginPage.jsx';
import RegisterPage from './RegisterPage.jsx';
import Explore from './Explore.jsx';
import Watchlist from './Watchlist.jsx'; 
import FilmDetails from "./FilmDetails";
import Profile from "./Profile";
import AdminDashboard from './AdminDashboard';
import AjouterFilm from './AjouterFilm';
import SupprimerFilm from './SupprimerFilm';
import SerieDetails from './SerieDetails';
import WhatIsCinema from "./WhatIsCinema";
import FAQ from "./FAQ";
import Condition from "./Condition";
import ModifierFilm from "./ModifierFilm";

import axios from 'axios';


function App() {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (film) => {
    if (!watchlist.find(f => f.id === film.id)) {
      setWatchlist([...watchlist, film]);
    }
  };

  const removeFromWatchlist = (id) => {
    setWatchlist(watchlist.filter((film) => film.id !== id));
  };

  // useEffect(()=>{
//     fetchData();
//   },[]);

// const fetchData = async () => {
//   try {
//     const response = await axios.get('http://127.0.0.1:8000/api/avis', {
//       headers: {
//         'Accept': 'application/json'
//       }
//     });
    
//     console.log(response.data);
//     // return response.data;

//   } catch (error) {
//     console.error('Erreur lors de la récupération des avis:', error);
//     throw error;
//   }
// };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/explore" element={<Explore addToWatchlist={addToWatchlist} />} />
        <Route path="/film/:id" element={<FilmDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/watchlist" element={<Watchlist watchlist={watchlist} removeFromWatchlist={removeFromWatchlist}  />} /> {/* ✅ */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/ajouter-film" element={<AjouterFilm />} />
        <Route path="/admin/supprimer-film" element={<SupprimerFilm />} />
        <Route path="/admin/ajouter-film" element={<AjouterFilm />} />
        <Route path="/admin/supprimer-film" element={<SupprimerFilm />} />
        <Route path="/serie/:id" element={<SerieDetails />} />
        <Route path="/whatiscinema" element={<WhatIsCinema />} />
<Route path="/faq" element={<FAQ />} />
<Route path="/condition" element={<Condition />} />
<Route path="/admin/modifier-film" element={<ModifierFilm />} />




    
    </Routes>
    </Router>
  );
}

export default App;
