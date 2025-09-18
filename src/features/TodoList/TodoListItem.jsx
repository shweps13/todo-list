import styles from '../../css/TodoListItem.module.css'
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { useState, useEffect, useRef } from "react";
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from "react-icons/ri";
import styled from 'styled-components';

const CheckboxIcon = styled.div`
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    margin-right: 8px;
    
    svg {
        position: relative;
        top: 4px;
        font-size: 20px;
        color: #6a5bcd;
    }
    
`;

function TodoListItem({
    todo,
    onCompleteTodo,
    onUpdateTodo,
    currEditingId,
    setCurrEditingId
}) {
    const isEditing = currEditingId === todo.id;
    const [workingTitle, setWorkingTitle] = useState(todo.title);
    const inputRef = useRef(null);

    const handleCancel = () => {
        setWorkingTitle(todo.title);
        setCurrEditingId(null);
    };

    const handleEdit = (e) => {
        setWorkingTitle(e.target.value);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        onUpdateTodo(todo, workingTitle);
        setCurrEditingId(null);
    };

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing, todo]);

    return (
        <li className={styles.todoItem}>
            <form onSubmit={handleUpdate}>
                {isEditing ? (
                    <>
                        <TextInputWithLabel
                            ref={inputRef}
                            value={workingTitle}
                            onChange={handleEdit}
                        />
                        <button type="button" onClick={handleCancel}>Cancel</button>
                        <button type="submit">Update</button>
                    </>
                ) : (
                    <>
                        <CheckboxIcon onClick={onCompleteTodo}>
                            {todo.isCompleted ? <RiCheckboxCircleFill /> : <RiCheckboxBlankCircleLine />}
                        </CheckboxIcon>
                        <span onClick={() => setCurrEditingId(todo.id)}>{todo.title}</span>
                    </>
                )}
            </form>
        </li>
    );
}

export default TodoListItem;