import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Confessions from './pages/Confessions';
import CreateConfession from './pages/CreateConfession';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Leaderboard from './pages/Leaderboard';
import Admin from './pages/Admin';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Always start logged out
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const isAdmin = user && user.isAdmin;

  return (
    <div className="app">
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} isAdmin={isAdmin} />
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} user={user} />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/admin" element={isAuthenticated ? <Admin isAuthenticated={isAuthenticated} user={user} /> : <Navigate to="/login" />} />
          <Route 
            path="/login" 
            element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/register" 
            element={!isAuthenticated ? <Register setIsAuthenticated={setIsAuthenticated} setUser={setUser} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/confessions" 
            element={isAuthenticated ? <Confessions /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/create-confession" 
            element={isAuthenticated ? <CreateConfession /> : <Navigate to="/login" />} 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
