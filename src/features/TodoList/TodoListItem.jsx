import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { useState, useEffect, useRef } from "react";

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [workingTitle, setWorkingTitle] = useState(todo.title);
    const inputRef = useRef(null);

    const handleCancel = () => {
        setWorkingTitle(todo.title);
        setIsEditing(false);
    };

    const handleEdit = (e) => {
        setWorkingTitle(e.target.value);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        onUpdateTodo(todo, workingTitle);
        setIsEditing(false);
    };

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    return (
        <li>
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
                        <input
                            type="checkbox"
                            checked={todo.isCompleted}
                            onChange={onCompleteTodo}
                        />
                        <span onClick={() => setIsEditing(true)}>{todo.title}</span>
                    </>
                )}
            </form>
        </li>
    );
}

export default TodoListItem;