import styles from '../css/TodoForm.module.css'
import { useRef, useState } from "react"
import TextInputWithLabel from "../shared/TextInputWithLabel"
import { HiPlus } from "react-icons/hi";
import { MdSaveAs } from "react-icons/md";
import styled from 'styled-components';

const StyledButton = styled.button`
    border-radius: 50%;
    background: #6a5bcdff;
    color: white;
    border: none;
    margin-left: 10px;
    width: 50px;
    height: 50px;
    cursor: pointer;

    svg {
        position: relative;
        top: 1px;
        width: 25px;
        height: 25px;
    }

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;

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
            <StyledButton disabled={workingTodoTitle === ''} >
                {isSaving ? <MdSaveAs /> : <HiPlus />}
            </StyledButton>
        </form>
    )
}

export default TodoForm;