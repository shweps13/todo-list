import { useRef } from "react"

function TodoForm({addToDo}) {
    
    function handleAddTodo(event) {
        event.preventDefault()
        const title = event.target.title.value
        addToDo(title)
        event.target.title.value = ''
        todoTitleInput.current.focus()
    }

    const todoTitleInput = useRef('')

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo</label>
            <input ref={todoTitleInput} id="todoTitle" name="title"></input>
            <button>Add Todo</button>
        </form>
    )
}

export default TodoForm;