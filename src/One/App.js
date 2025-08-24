import { useState } from 'react';
import FirebasePage from './pages/FireBasePage';
import JsonServerPage from './pages/JsonServerPage';
import JsonPlaceholderPage from './pages/JsonPlaceholderPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('menu');

  const renderPage = () => {
    switch (currentPage) {
      case 'firebase':
        return <FirebasePage />;
      case 'jsonServer':
        return <JsonServerPage />;
      case 'jsonPlaceholder':
        return <JsonPlaceholderPage />;
      default:
        return renderMenu();
    }
  };

  const renderMenu = () => {
    return (
      <div className="menu-container">
        <div className="menu-header">
          <h1>Todo List</h1>
          <p>Выберите реализацию</p>
        </div>

        <div className="menu-options">
          <div className="menu-card" onClick={() => setCurrentPage('firebase')}>
            <div className="menu-icon">🔥</div>
            <h3>Firebase</h3>
            <p>Real-time база данных</p>
          </div>

          <div
            className="menu-card"
            onClick={() => setCurrentPage('jsonServer')}
          >
            <div className="menu-icon">🔄</div>
            <h3>JSON Server</h3>
            <p>Локальный REST API с сохранением данных</p>
          </div>

          <div
            className="menu-card"
            onClick={() => setCurrentPage('jsonPlaceholder')}
          >
            <div className="menu-icon">🌐</div>
            <h3>JSON Placeholder</h3>
            <p>Внешний API только для чтения</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      {currentPage !== 'menu' && (
        <nav className="navigation">
          <button
            className="back-button"
            onClick={() => setCurrentPage('menu')}
          >
            ← Назад в меню
          </button>
          <span className="current-page">
            {currentPage === 'firebase' && 'Firebase'}
            {currentPage === 'jsonServer' && 'JSON Server'}
            {currentPage === 'jsonPlaceholder' && 'JSON Placeholder'}
          </span>
        </nav>
      )}

      {renderPage()}
    </div>
  );
}

export default App;
