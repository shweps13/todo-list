import styles from './css/App.module.css'
import { useEffect, useCallback, useReducer } from 'react'
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

  useEffect(() => {
    fetchTodos(); 
  }, [todoState.sortDirection, todoState.sortField, todoState.queryString])
  
  const fetchTodos = useCallback(async () => {
    try {
      dispatch({ type: todosActions.fetchTodos });
      
      const result = await dbCall('GET', null, { 
        sortField: todoState.sortField, 
        sortDirection: todoState.sortDirection, 
        queryString: todoState.queryString 
      });

      dispatch({ type: todosActions.loadTodos, records: result.records });
    } catch (error) {
      dispatch({ type: todosActions.setLoadError, error: error });
    } 
  }, [todoState.sortField, todoState.sortDirection, todoState.queryString]);

  const addToDo = useCallback(async (title) => {
    try {
      dispatch({ type: todosActions.startRequest });

      const result = await dbCall('POST', {
        records: [{ fields: { title, isCompleted: false } }],
      }, { 
        sortField: todoState.sortField, 
        sortDirection: todoState.sortDirection, 
        queryString: todoState.queryString 
      });

      dispatch({ type: todosActions.addTodo, records: [result.records?.[0]] });
    } catch (error) {
      dispatch({ type: todosActions.setLoadError, error: error });
    } finally {
      dispatch({ type: todosActions.endRequest });
    }
  }, [todoState.sortField, todoState.sortDirection, todoState.queryString]);

  const completeTodo = useCallback(async (selectedToDo) => {
    try {
      dispatch({ type: todosActions.startRequest });

      await dbCall('PATCH', {
        records: [{
          id: selectedToDo.id,
          fields: { title: selectedToDo.title, isCompleted: true },
        }],
      }, { 
        sortField: todoState.sortField, 
        sortDirection: todoState.sortDirection, 
        queryString: todoState.queryString 
      });

      dispatch({ type: todosActions.completeTodo, records: [selectedToDo] });
    } catch (error) {
      dispatch({ type: todosActions.setLoadError, error: error });
    } finally {
      dispatch({ type: todosActions.endRequest });
    }
  }, [todoState.sortField, todoState.sortDirection, todoState.queryString]);

  const updateTodo = useCallback(async (editedTodo, workingTitle) => {
    try {
      dispatch({ type: todosActions.startRequest });

      await dbCall('PATCH', {
        records: [{
          id: editedTodo.id,
          fields: { title: workingTitle, isCompleted: editedTodo.isCompleted },
        }],
      }, { 
        sortField: todoState.sortField, 
        sortDirection: todoState.sortDirection, 
        queryString: todoState.queryString 
      });

      dispatch({ type: todosActions.updateTodo, records: [{ ...editedTodo, title: workingTitle }] });
    } catch (error) {
      dispatch({ type: todosActions.setLoadError, error: error });
    } finally {
      dispatch({ type: todosActions.endRequest });
    }
  }, [todoState.sortField, todoState.sortDirection, todoState.queryString]);

  const filteredTodoList = todoState.todoList.filter((todo) => todo.isCompleted != true)

  return (
    <div className={styles.mainFrame}>

      <h1><MdDoneAll /> FocusFlow</h1>
      <TodoForm addToDo={addToDo} isSaving={todoState.isSaving} />
      <TodoList todos={filteredTodoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} isLoading={todoState.isLoading} />
      <hr />
      <TodosViewForm 
        sortField={todoState.sortField} 
        setSortField={(value) => dispatch({ type: todosActions.setSortField, sortField: value })}
        sortDirection={todoState.sortDirection} 
        setSortDirection={(value) => dispatch({ type: todosActions.setSortDirection, sortDirection: value })}
        queryString={todoState.queryString} 
        setQueryString={(value) => dispatch({ type: todosActions.setQueryString, queryString: value })}
      />
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