import styles from '../css/TodoForm.module.css'
import { useRef, useState } from "react"
import TextInputWithLabel from "../shared/TextInputWithLabel"
import { HiPlus } from "react-icons/hi";
import { MdSaveAs } from "react-icons/md";

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
        <form className={styles.mainForm} onSubmit={handleAddTodo}>
            <TextInputWithLabel 
                elementId="todoTitle" 
                label="Todo" 
                value={workingTodoTitle}
                ref={todoTitleInput}
                onChange={(e) => setWorkingTodoTitle(e.target.value)} 
                />
            <button disabled={workingTodoTitle === ''} >
                {isSaving ? <MdSaveAs /> : <HiPlus />}
            </button>
        </form>
    )
}

export default TodoForm;