import { useRef, useState } from "react"

function TodoForm({ addToDo }) {

    const [workingTodoTitle, setWorkingTodoTitle] = useState('')

    function handleAddTodo(event) {
        event.preventDefault()
        addToDo(workingTodoTitle)
        setWorkingTodoTitle('')
        todoTitleInput.current.focus()
    }

    const todoTitleInput = useRef('')

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo</label>
            <input
                ref={todoTitleInput}
                id="todoTitle"
                name="title"
                value={workingTodoTitle}
                onChange={(e) => setWorkingTodoTitle(e.target.value)} />
            <button disabled={workingTodoTitle === ''} >Add Todo</button>
        </form>
    )
}

export default TodoForm;