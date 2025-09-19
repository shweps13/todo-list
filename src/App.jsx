import styles from './css/App.module.css'
import { useEffect, useCallback, useReducer } from 'react'
import Header from './shared/Header'
import TodosPage from './pages/TodosPage'
import About from './pages/About'
import NotFound from './pages/NotFound'
import { dbCall } from './api/airtable'
import { PiWarningCircleFill } from "react-icons/pi";
import { Routes, Route } from 'react-router'

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

      <Header />
      <Routes>
        <Route path="/" element={<TodosPage
          addToDo={addToDo}
          isSaving={todoState.isSaving}
          todos={filteredTodoList}
          onCompleteTodo={completeTodo}
          onUpdateTodo={updateTodo}
          isLoading={todoState.isLoading}
          sortField={todoState.sortField}
          setSortField={(value) => dispatch({ type: todosActions.setSortField, sortField: value })}
          sortDirection={todoState.sortDirection}
          setSortDirection={(value) => dispatch({ type: todosActions.setSortDirection, sortDirection: value })}
          queryString={todoState.queryString}
          setQueryString={(value) => dispatch({ type: todosActions.setQueryString, queryString: value })}
        />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>


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