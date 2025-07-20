import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addTodo, toggleTodo, deleteTodo, editTodo } from '../store/slices/todoSlice'
import './TodoList.css'

const TodoList: React.FC = () => {
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState('')
  
  const { todos } = useAppSelector(state => state.todos)
  const dispatch = useAppDispatch()

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo.trim()))
      setNewTodo('')
    }
  }

  const handleToggleTodo = (id: string) => {
    dispatch(toggleTodo(id))
  }

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id))
  }

  const handleEditStart = (id: string, text: string) => {
    setEditingId(id)
    setEditingText(text)
  }

  const handleEditSave = (id: string) => {
    if (editingText.trim()) {
      dispatch(editTodo({ id, text: editingText.trim() }))
    }
    setEditingId(null)
    setEditingText('')
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditingText('')
  }

  return (
    <div className="todo-container">
      <h2>📝 Todo List</h2>
      
      <form onSubmit={handleAddTodo} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="todo-input"
        />
        <button type="submit" className="add-btn">Add Todo</button>
      </form>

      <div className="todo-list">
        {todos.length === 0 ? (
          <p className="empty-message">No todos yet. Add one above!</p>
        ) : (
          todos.map(todo => (
            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
                className="todo-checkbox"
                aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
              />
              
              {editingId === todo.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="edit-input"
                    autoFocus
                    aria-label="Edit todo text"
                  />
                  <button onClick={() => handleEditSave(todo.id)} className="save-btn">
                    Save
                  </button>
                  <button onClick={handleEditCancel} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="todo-content">
                  <span className="todo-text">{todo.text}</span>
                  <div className="todo-actions">
                    <button 
                      onClick={() => handleEditStart(todo.id, todo.text)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="todo-stats">
        <p>Total: {todos.length} | Completed: {todos.filter(t => t.completed).length} | Pending: {todos.filter(t => !t.completed).length}</p>
      </div>
    </div>
  )
}

export default TodoList
