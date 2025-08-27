import './App.css'
import { useState, useEffect } from 'react'
import TodoList from './features/TodoList/TodoList'
import TodoForm from './features/TodoForm'

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true)
    fetchTodos();
  }, [])

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  const fetchTodos = async () => {
    const options = {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }

    try {
      const response = await fetch(url, options);

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

  const addToDo = async (title) => {
    const newTodo = { id: Date.now(), title, isCompleted: false }
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      'method': 'POST',
      'headers': {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify(payload),
    }

    try {
      setIsSaving(true)
      const response = await fetch(url, options);

      if (!response.ok) {
        setErrorMessage(`Response status: ${response.status}`)
        return
      }

      const { records } = await response.json();

      const savedTodo = {
        id: records[0].id,
        title: records[0].fields.title,
        isCompleted: false
      }

      setTodoList([...todoList, savedTodo]);

    } catch (error) {
      console.error('Cannot post ToDo')
      setErrorMessage(`Response status: ${error.status}`)
    } finally {
      setIsSaving(false)
    }
  }

  const completeTodo = async (selectedToDo) => {
    console.log('selectedToDo', selectedToDo)
    const payload = {
      records: [
        {
          id: selectedToDo.id,
          fields: {
            title: selectedToDo.title,
            isCompleted: true,
          },
        },
      ],
    };

    const options = {
      'method': 'PATCH',
      'headers': {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify(payload),
    }

    try {
      setIsSaving(true)

      const response = await fetch(url, options);

      if (!response.ok) {
        setErrorMessage(`Response status: ${response.status}`)
        return
      }

      const updatedTodos = todoList.map((todo) => {
        if (todo.id === selectedToDo.id) {
          return { ...todo, isCompleted: true }
        } else {
          return todo
        }
      })
      setTodoList(updatedTodos)


    } catch (error) {
      console.error('Cannot complete ToDo')
      setErrorMessage(`Response status: ${error.message}`)
      return
    } finally {
      setIsSaving(false)
    }
  }

  const updateTodo = async (editedTodo, workingTitle) => {
    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: workingTitle,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      'method': 'PATCH',
      'headers': {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify(payload),
    }

    try {
      setIsSaving(true)

      const response = await fetch(url, options);

      if (!response.ok) {
        setErrorMessage(`Response status: ${response.status}`)
        return
      }

      const updatedTodos = todoList.map((todo) => {
        if (todo.id === editedTodo.id) {
          return { ...todo, title: workingTitle }
        } else {
          return todo
        }
      })
      setTodoList(updatedTodos)

    } catch (error) {
      console.error('Cannot edit ToDo')
      setErrorMessage(`Response status: ${error.status}`)
      return
    } finally {
      setIsSaving(false)
    }
  }

  const filteredTodoList = todoList.filter((todo) => todo.isCompleted != true)

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm addToDo={addToDo} isSaving={isSaving} />
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