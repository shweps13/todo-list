import styles from './css/App.module.css'
import { useState, useEffect, useCallback, useReducer } from 'react'
import TodoList from './features/TodoList/TodoList'
import TodoForm from './features/TodoForm'
import TodosViewForm from './features/TodosViewForm'
import { dbCall } from './api/airtable'
import { MdDoneAll } from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";

import {
  reducer as todosReducer,
  actions as todosActions,
  initialState as todosInitialState
} from './reducers/todos.reducer'

function App() {
  const [todoState, dispatch] = useReducer(todosReducer, todosInitialState);

  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");
  const [queryString, setQueryString] = useState("");

  useEffect(() => {
    fetchTodos(); 
  }, [sortDirection, sortField, queryString])
  
  const fetchTodos = useCallback(async () => {
    try {
      dispatch({ type: todosActions.fetchTodos });
      
      const result = await dbCall('GET', null, { sortField, sortDirection, queryString });

      dispatch({ type: todosActions.loadTodos, records: result.records });
    } catch (error) {
      dispatch({ type: todosActions.setLoadError, error: error });
    } 
  }, [sortField, sortDirection, queryString]);

  const addToDo = useCallback(async (title) => {
    try {
      dispatch({ type: todosActions.startRequest });

      const result = await dbCall('POST', {
        records: [{ fields: { title, isCompleted: false } }],
      }, { sortField, sortDirection, queryString });

      dispatch({ type: todosActions.addTodo, records: [result.records?.[0]] });
    } catch (error) {
      dispatch({ type: todosActions.setLoadError, error: error });
    } finally {
      dispatch({ type: todosActions.endRequest });
    }
  }, [sortField, sortDirection, queryString]);

  const completeTodo = useCallback(async (selectedToDo) => {
    try {
      dispatch({ type: todosActions.startRequest });

      await dbCall('PATCH', {
        records: [{
          id: selectedToDo.id,
          fields: { title: selectedToDo.title, isCompleted: true },
        }],
      }, { sortField, sortDirection, queryString });

      dispatch({ type: todosActions.completeTodo, records: [selectedToDo] });
    } catch (error) {
      dispatch({ type: todosActions.setLoadError, error: error });
    } finally {
      dispatch({ type: todosActions.endRequest });
    }
  }, [sortField, sortDirection, queryString]);

  const updateTodo = useCallback(async (editedTodo, workingTitle) => {
    try {
      dispatch({ type: todosActions.startRequest });

      await dbCall('PATCH', {
        records: [{
          id: editedTodo.id,
          fields: { title: workingTitle, isCompleted: editedTodo.isCompleted },
        }],
      }, { sortField, sortDirection, queryString });

      dispatch({ type: todosActions.updateTodo, records: [{ ...editedTodo, title: workingTitle }] });
    } catch (error) {
      dispatch({ type: todosActions.setLoadError, error: error });
    } finally {
      dispatch({ type: todosActions.endRequest });
    }
  }, [sortField, sortDirection, queryString]);

  const filteredTodoList = todoState.todoList.filter((todo) => todo.isCompleted != true)

  return (
    <div className={styles.mainFrame}>

      <h1><MdDoneAll /> FocusFlow</h1>
      <TodoForm addToDo={addToDo} isSaving={todoState.isSaving} />
      <TodoList todos={filteredTodoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} isLoading={todoState.isLoading} />
      <hr />
      <TodosViewForm sortField={sortField} setSortField={setSortField} sortDirection={sortDirection} setSortDirection={setSortDirection} queryString={queryString} setQueryString={setQueryString} />
      {todoState.errorMessage != "" ?
        <div className={styles.errorMessage}>
          <p><PiWarningCircleFill /> Error happened</p>
          <p>{todoState.errorMessage}</p>
          <button onClick={() => { dispatch({ type: todosActions.clearError }) }}>Dismiss</button>
        </div>
        : <></>}
    </div>
  )
}

export default App