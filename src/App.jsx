import './App.css'
import { useState } from 'react'
import TodoList from './TodoList'
import TodoForm from './TodoForm'

function App() {
  const [todoList, setTodoList] = useState([]);

  const addToDo = (title) => {
    console.log(title)
    const newTodo = { id: Date.now(), title }
    console.log(newTodo)
    setTodoList([...todoList, newTodo])
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm addToDo={addToDo}/>
      <TodoList todos={todoList} />
    </div>
  )
}

export default App