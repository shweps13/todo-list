import { useRef, useState } from "react"
import TextInputWithLabel from "../shared/TextInputWithLabel"

function TodoForm({ addToDo, isSaving }) {

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
            <TextInputWithLabel 
                elementId="todoTitle" 
                label="Todo" 
                value={workingTodoTitle}
                ref={todoTitleInput}
                onChange={(e) => setWorkingTodoTitle(e.target.value)} 
                />
            <button disabled={workingTodoTitle === ''} >
                {isSaving ? 'Saving...' : 'Add Todo'}
            </button>
        </form>
    )
}

export default TodoForm;