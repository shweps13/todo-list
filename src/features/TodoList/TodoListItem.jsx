import '../../css/TodoListItem.module.css'
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { useState, useEffect, useRef } from "react";

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
                        <span onClick={() => setCurrEditingId(todo.id)}>{todo.title}</span>
                    </>
                )}
            </form>
        </li>
    );
}

export default TodoListItem;