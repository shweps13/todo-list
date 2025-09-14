import styles from './css/App.module.css'
import { useState, useEffect, useCallback } from 'react'
import TodoList from './features/TodoList/TodoList'
import TodoForm from './features/TodoForm'
import TodosViewForm from './features/TodosViewForm'
import { dbCall } from './api/airtable'

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");
  const [queryString, setQueryString] = useState("");

  useEffect(() => {
    setIsLoading(true)
    fetchTodos();
  }, [sortDirection, sortField, queryString])

  const fetchTodos = useCallback(async () => {
    try {
      setIsLoading(true)
      const result = await dbCall('GET', null, { sortField, sortDirection, queryString });

      const fetchedToDos = result.records.map((record) => ({
        id: record.id,
        isCompleted: record.fields.isCompleted ?? false,
        title: record.fields.title ?? "",
      }));

      setTodoList(fetchedToDos);
    } catch (error) {
      console.log(error)
      setErrorMessage(error.status)
    } finally {
      setIsLoading(false)
    }
  }, [sortField, sortDirection, queryString]);

  const addToDo = useCallback(async (title) => {
    try {
      setIsSaving(true)

      const result = await dbCall('POST', {
        records: [{ fields: { title, isCompleted: false } }],
      }, { sortField, sortDirection, queryString });

      const rec = result.records?.[0];
      const savedTodo = {
        id: rec.id,
        title: rec.fields?.title ?? "",
        isCompleted: !!rec.fields?.isCompleted,
      };

      setTodoList((prev) => [...prev, savedTodo]);
    } catch (error) {
      console.error('Cannot post ToDo')
      setErrorMessage(`Response status: ${error.status}`)
    } finally {
      setIsSaving(false)
    }
  }, [sortField, sortDirection, queryString]);

  const completeTodo = useCallback(async (selectedToDo) => {
    try {
      setIsSaving(true)

      await dbCall('PATCH', {
        records: [{
          id: selectedToDo.id,
          fields: { title: selectedToDo.title, isCompleted: true },
        }],
      }, { sortField, sortDirection, queryString });

      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === selectedToDo.id ? { ...todo, isCompleted: true } : todo
        )
      );

    } catch (error) {
      console.error('Cannot complete ToDo')
      setErrorMessage(`Response status: ${error.message}`)
    } finally {
      setIsSaving(false)
    }
  }, [sortField, sortDirection, queryString]);

  const updateTodo = useCallback(async (editedTodo, workingTitle) => {
    try {
      setIsSaving(true)

      await dbCall('PATCH', {
        records: [{
          id: editedTodo.id,
          fields: { title: workingTitle, isCompleted: editedTodo.isCompleted },
        }],
      }, { sortField, sortDirection, queryString });

      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === editedTodo.id ? { ...todo, title: workingTitle } : todo
        )
      );

    } catch (error) {
      console.error('Cannot edit ToDo')
      setErrorMessage(`Response status: ${error.status}`)
    } finally {
      setIsSaving(false)
    }
  }, [sortField, sortDirection, queryString]);

  const filteredTodoList = todoList.filter((todo) => todo.isCompleted != true)

  return (
    <div className={styles.mainFrame}>
      <h1>Todo List</h1>
      <TodoForm addToDo={addToDo} isSaving={isSaving} />
      <TodoList todos={filteredTodoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} isLoading={isLoading} />
      <hr />
      <TodosViewForm sortField={sortField} setSortField={setSortField} sortDirection={sortDirection} setSortDirection={setSortDirection} queryString={queryString} setQueryString={setQueryString} />
      {errorMessage != "" ?
        <div className={styles.errorMessage}>
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