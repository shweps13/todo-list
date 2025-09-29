import styles from '../css/ToDoPage.module.css'
import TodoList from '../features/TodoList/TodoList'    
import TodoForm from '../features/TodoForm'
import TodosViewForm from '../features/TodosViewForm'
import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router'


function TodosPage({ todos, onCompleteTodo, onUpdateTodo, isLoading, addToDo, isSaving, sortField, setSortField, sortDirection, setSortDirection, queryString, setQueryString }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const itemsPerPage = 15
    const currentPage = parseInt(searchParams.get('page') || '1', 10)
    const indexOfFirstTodo = (currentPage - 1) * itemsPerPage
    const indexOfLastTodo = indexOfFirstTodo + itemsPerPage
    const totalPages = Math.ceil(todos.length / itemsPerPage)
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo)

    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            navigate("/")
        }
    }, [totalPages, currentPage, navigate])

    function handlePreviousPage(page) {
        setSearchParams({ page: page - 1 })
    }

    function handleNextPage(page) {
        setSearchParams({ page: page + 1 })
    }

    return (
        <div className={styles.viewPage}>
            <TodoList todos={currentTodos} onCompleteTodo={onCompleteTodo} onUpdateTodo={onUpdateTodo} isLoading={isLoading} />
            <div className={styles.paginationControls}>
                <button onClick={() => handlePreviousPage(currentPage)} disabled={currentPage === 1}>Previous</button>
                <span>{currentPage} of {totalPages}</span>
                <button onClick={() => handleNextPage(currentPage)} disabled={currentPage === totalPages}>Next</button>
            </div>
            <TodoForm addToDo={addToDo} isSaving={isSaving} />
            <hr />
            <TodosViewForm sortField={sortField} setSortField={setSortField} sortDirection={sortDirection} setSortDirection={setSortDirection} queryString={queryString} setQueryString={setQueryString} />
        </div>
    )
}

export default TodosPage;