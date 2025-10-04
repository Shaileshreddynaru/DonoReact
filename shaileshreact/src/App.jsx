import * as React from 'react';
import jwtDecode from 'jwt-decode';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './components/registration'; // Import the Registration component
import ListComponent from './components/ListComponent';
import Table from './components/Table';
import Header from './components/Header';
import Footer from './components/Footer';
import TopLikedPosts from './components/TopLikedPosts';
import AddPost from './components/addpost';
import './App.css';
 
 function HomePage() {
   return (
     <div className="home-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: '2rem' }}>
       <img src="/vite.svg" alt="Donor App Logo" style={{ width: 120, marginBottom: 24 }} />
       <h1 style={{ color: '#007bff', fontWeight: 700, marginBottom: 16 }}>Welcome to DonorApp</h1>
       <p style={{ maxWidth: 600, fontSize: 18, color: '#333', textAlign: 'center', marginBottom: 24 }}>
         Our DonorApp helps you easily manage, track, and connect with donors. Register, log in, and view top liked posts, add new donations, and see all donor lists in one place. Secure, fast, and user-friendly for both organizations and donors.
       </p>
       <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Helping Hands" style={{ width: 320, borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }} />
     </div>
   );
 }

function App() {
  React.useEffect(() => {
    let timeout;
    function setLogoutTimer() {
      const token = localStorage.getItem('jwtToken');
      if (!token) return;
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp) {
          const expiresAt = decoded.exp * 1000;
          const now = Date.now();
          if (expiresAt > now) {
            timeout = setTimeout(() => {
              localStorage.removeItem('jwtToken');
              window.dispatchEvent(new Event('authChange'));
              window.location.href = '/';
            }, expiresAt - now);
          } else {
            // Token already expired
            localStorage.removeItem('jwtToken');
            window.dispatchEvent(new Event('authChange'));
            window.location.href = '/';
          }
        }
      } catch (e) {
        // Invalid token, force logout
        localStorage.removeItem('jwtToken');
        window.dispatchEvent(new Event('authChange'));
  window.location.href = '/';
      }
    }
    setLogoutTimer();
    // Listen for login/logout events to reset timer
    window.addEventListener('authChange', setLogoutTimer);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('authChange', setLogoutTimer);
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/in' element={<TopLikedPosts />} />
          <Route path='/addpost' element={<AddPost />} />
          <Route path='/donorList' element={<ListComponent />} />
          <Route path='/donor' element={<Table />} />
          <Route path='/login' element={<Registration />} /> {/* Add route for registration */}
        </Routes>
        <footer>
          <Footer />
        </footer>
      </Router>
    </div>
  );
}

export default App;
