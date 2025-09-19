import styles from '../css/ToDoPage.module.css'
import TodoList from '../features/TodoList/TodoList'    
import TodoForm from '../features/TodoForm'
import TodosViewForm from '../features/TodosViewForm'


function TodosPage({ todos, onCompleteTodo, onUpdateTodo, isLoading, addToDo, isSaving, sortField, setSortField, sortDirection, setSortDirection, queryString, setQueryString }) {
    return (
        <div className={styles.viewPage}>
            <TodoList todos={todos} onCompleteTodo={onCompleteTodo} onUpdateTodo={onUpdateTodo} isLoading={isLoading} />
            <TodoForm addToDo={addToDo} isSaving={isSaving} />
            <hr />
            <TodosViewForm sortField={sortField} setSortField={setSortField} sortDirection={sortDirection} setSortDirection={setSortDirection} queryString={queryString} setQueryString={setQueryString} />
        </div>
    )
}

export default TodosPage;