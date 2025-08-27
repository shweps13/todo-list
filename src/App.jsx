import './App.css'
import { useState, useEffect } from 'react'
import TodoList from './features/TodoList/TodoList'
import TodoForm from './features/TodoForm'

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true)
    fetchTodos();
  }, [])

  const fetchTodos = async () => {
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    const token = `Bearer ${import.meta.env.VITE_PAT}`;
    const options = {
      // "method": "GET",
      "Content-Type": "application/json",
      "Authorization": token
    }

    try {
      const response = await fetch(url, {
        headers: options,
      });

      if (!response.ok) {
        setErrorMessage(`Response status: ${response.status}`)
        return
      }

      const result = await response.json();

      const fetchedToDos = result.records.map((record) => {
        const restructedToDo = { id: record.id }
        restructedToDo.isCompleted = record.fields.isCompleted ?? false;
        restructedToDo.title = record.fields.title ?? "";

        return restructedToDo
      })

      setTodoList(fetchedToDos)
    } catch (error) {
      setErrorMessage(error.status)
    } finally {
      setIsLoading(false)
    }

  }

  const addToDo = (title) => {
    const newTodo = { id: Date.now(), title, isCompleted: false }
    setTodoList([...todoList, newTodo])
  }

  const completeTodo = (selectedToDo) => {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === selectedToDo.id) {
        return { ...todo, isCompleted: true }
      } else {
        console.log(todo)
        return todo
      }
    })
    setTodoList(updatedTodos)
  }

  const updateTodo = (editedTodo, workingTitle) => {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...todo, title: workingTitle }
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
      <TodoList todos={filteredTodoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} isLoading={isLoading} />
      {errorMessage != "" ?
        <div>
          <hr />
          <p>Error happened</p>
          <p>{errorMessage}</p>
          <button onClick={() => { setErrorMessage("") }}>Dismiss</button>
          <hr />
        </div>
        : <></>}
    </div>
  )
}

export default App