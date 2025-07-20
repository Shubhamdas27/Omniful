import { Provider } from 'react-redux'
import { store } from './store/store'
import TodoList from './components/TodoList'
import TeamManagement from './components/TeamManagement'
import { loadSampleData } from './sampleData'
import './App.css'

function App() {
  const handleLoadSampleData = () => {
    loadSampleData()
  }

  return (
    <Provider store={store}>
      <div className="app">
        <header className="app-header">
          <h1>🚀 Redux Toolkit Assignment</h1>
          <p>ToDo List & Team Management System</p>
          <button 
            onClick={handleLoadSampleData}
            className="sample-data-btn"
          >
            Load Sample Data 📊
          </button>
        </header>
        
        <main className="app-main">
          <div className="dashboard-wrapper">
            <div className="dashboard-content">
              <TodoList />
              <TeamManagement />
            </div>
          </div>
        </main>
        
        <footer className="app-footer">
          <p>Built with React, TypeScript & Redux Toolkit</p>
        </footer>
      </div>
    </Provider>
  )
}

export default App
