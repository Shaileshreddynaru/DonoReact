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
