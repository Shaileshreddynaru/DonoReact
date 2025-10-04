import * as React from 'react';
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
    const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutes

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        localStorage.removeItem('jwtToken');
        window.dispatchEvent(new Event('authChange'));
        window.location.href = '/';
      }, INACTIVITY_LIMIT);
    };

    // List of events that indicate user activity
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];
    events.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timeout);
      events.forEach(event => window.removeEventListener(event, resetTimer));
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
