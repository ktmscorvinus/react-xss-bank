// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import FundsPage from './components/FundsPage';
import FeedbackPage from './components/FeedbackPage';
import Cookies from 'js-cookie';

function App() {

  Cookies.set('session-id', 'AwEgatipTHQahu42ddu'); 


  return (
    <Router>
      <div style={{ margin: '20px' }}>
        <nav>
          <ul>
          <li>
              <Link to="/">Kezdőoldal</Link>
            </li>

            <li>
              <Link to="/search">Keresés a GYIK-ben (Reflected XSS)</Link>
            </li>
           
            <li>
              <Link to="/funds">Befektetési alapok szűrése (DOM-based XSS)</Link>
            </li>
            
            <li>
              <Link to="/feedback">Ügyfélvélemények (Stored XSS)</Link>
            </li>
          </ul>
        </nav>
        <hr />
        <Routes>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/funds" element={<FundsPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route
            path="/"
            element={
              <div>
                <h1>Üdvözöl az XSS Bank!</h1>
                <p>Válassz egy menüpontot a navigációs sávból.</p>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

