import { useState } from 'react';
import {
  useLocalStorage,
  useDebounce,
  useFetch,
  useCounter,
  usePrevious,
  useToggle
} from './hooks';
import './App.css';

interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  // useLocalStorage demo
  const [name, setName] = useLocalStorage('user-name', '');
  const [theme, setTheme] = useLocalStorage('app-theme', 'light');

  // useDebounce demo
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // useFetch demo
  const { data: users, loading, error, refetch } = useFetch<User[]>(
    debouncedSearchTerm ? `https://jsonplaceholder.typicode.com/users?name_like=${debouncedSearchTerm}` : 'https://jsonplaceholder.typicode.com/users'
  );

  // useCounter demo
  const {
    count,
    increment,
    decrement,
    reset,
    setValue: setCountValue
  } = useCounter(0, { min: 0, max: 100, step: 1 });

  // usePrevious demo
  const previousCount = usePrevious(count);
  const previousSearchTerm = usePrevious(searchTerm);

  // useToggle demo
  const [isVisible, toggleVisible, showContent, hideContent] = useToggle(false);
  const [isDarkMode, toggleDarkMode] = useToggle(theme === 'dark');

  // Handle theme toggle
  const handleThemeToggle = () => {
    toggleDarkMode();
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <h1>Custom React Hooks Demo</h1>

        {/* useLocalStorage Demo */}
        <section className="demo-section">
          <h2>🗄️ useLocalStorage Hook</h2>
          <div className="demo-content">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p>Stored name: {name ? (
              <span className="status-indicator success">
                <strong>{name}</strong>
              </span>
            ) : (
              <span className="status-indicator info">No name stored</span>
            )}</p>
            <button onClick={handleThemeToggle}>
              Switch to {isDarkMode ? 'Light' : 'Dark'} Theme
            </button>
            <p>Current theme: <span className="status-indicator success"><strong>{theme}</strong></span></p>
          </div>
        </section>

        {/* useDebounce Demo */}
        <section className="demo-section">
          <h2>⏱️ useDebounce Hook</h2>
          <div className="demo-content">
            <input
              type="text"
              placeholder="Search users (debounced)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <p>Current search: <strong>{searchTerm}</strong></p>
            <p>Debounced search: <strong>{debouncedSearchTerm}</strong></p>
            <p>Previous search: <strong>{previousSearchTerm || 'None'}</strong></p>
          </div>
        </section>

        {/* useFetch Demo */}
        <section className="demo-section">
          <h2>🌐 useFetch Hook</h2>
          <div className="demo-content">
            <button onClick={refetch} disabled={loading}>
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Loading...
                </>
              ) : (
                'Refetch Users'
              )}
            </button>
            
            {error && <p className="error">Error: {error}</p>}
            
            {loading && <p>Loading users...</p>}
            
            {users && (
              <div className="users-list">
                <h3>Users ({users.length}):</h3>
                <div className="users-grid">
                  {users.slice(0, 6).map(user => (
                    <div key={user.id} className="user-card">
                      <h4>{user.name}</h4>
                      <p>{user.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* useCounter Demo */}
        <section className="demo-section">
          <h2>🔢 useCounter Hook</h2>
          <div className="demo-content">
            <div className="counter-controls">
              <button onClick={decrement}>-</button>
              <span className="counter-display">{count}</span>
              <button onClick={increment}>+</button>
            </div>
            <div className="counter-actions">
              <button onClick={reset}>Reset</button>
              <button onClick={() => setCountValue(50)}>Set to 50</button>
            </div>
            <p>Previous count: <strong>{previousCount ?? 'None'}</strong></p>
            <p>Range: 0-100, Step: 1</p>
          </div>
        </section>

        {/* usePrevious Demo */}
        <section className="demo-section">
          <h2>⏮️ usePrevious Hook</h2>
          <div className="demo-content">
            <p>This hook is demonstrated above with counter and search term.</p>
            <p>Current count: <strong>{count}</strong></p>
            <p>Previous count: <strong>{previousCount ?? 'None'}</strong></p>
          </div>
        </section>

        {/* useToggle Demo */}
        <section className="demo-section">
          <h2>🔄 useToggle Hook</h2>
          <div className="demo-content">
            <div className="toggle-controls">
              <button onClick={toggleVisible}>Toggle Visibility</button>
              <button onClick={showContent}>Show</button>
              <button onClick={hideContent}>Hide</button>
            </div>
            
            {isVisible && (
              <div className="toggle-content">
                <h3>🎉 Content is visible!</h3>
                <p>This content is controlled by the useToggle hook.</p>
              </div>
            )}
            
            <p>Content is: <span className={`status-indicator ${isVisible ? 'success' : 'info'}`}>
              <strong>{isVisible ? 'Visible' : 'Hidden'}</strong>
            </span></p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
