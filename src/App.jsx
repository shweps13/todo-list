import './App.css'
import { useState } from 'react'
import TodoList from './TodoList'
import TodoForm from './TodoForm'

function App() {
  const todos = [
    { id: 1, title: "review resources" },
    { id: 2, title: "take notes" },
    { id: 3, title: "code out app" },
  ]

  const [newToDo, setNewToDo] = useState('Test the app');

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm/>
      <p>{newToDo}</p>
      <TodoList todos={todos} />
    </div>
  )
}

export default App