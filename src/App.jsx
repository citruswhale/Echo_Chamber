import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TopicProvider } from './context/TopicContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DebatePage from './pages/DebatePage';
import AddTopicPage from './pages/AddTopicPage';
import LearnMorePage from './pages/LearnMorePage';
import './styles.css';

function App() {
  return (
    <TopicProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<AddTopicPage />} />
              <Route path="/debate/:topicId" element={<DebatePage />} />
              <Route path="/learn/:topicId" element={<LearnMorePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </TopicProvider>
  );
}

export default App;