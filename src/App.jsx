import './App.css'
import { useState } from 'react'
import TodoList from './TodoList'
import TodoForm from './TodoForm'

function App() {
  const [todoList, setTodoList] = useState([]);

  const addToDo = (title) => {
    const newTodo = { id: Date.now(), title, isCompleted: false }
    setTodoList([...todoList, newTodo])
  }

  const completeTodo = (selectedToDo) => {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === selectedToDo.id) {
        return {...todo, isCompleted: true}
      } else {
        return todo
      }
    })
    setTodoList(updatedTodos)
  }

  const filteredTodoList = todoList.filter((todo) => todo.isCompleted != true)

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm addToDo={addToDo} />
      {filteredTodoList.length === 0 ? 
        <p>Add todo above to get started</p> :
        <TodoList todos={filteredTodoList} onCompleteTodo={completeTodo} />
      }
    </div>
  )
}

export default App