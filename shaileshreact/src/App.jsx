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
