import styles from '../../css/TodoList.module.css'
import { useState } from 'react';
import TodoListItem from './TodoListItem'
import { ClipLoader } from "react-spinners";

const override = {
    display: "block",
    margin: "10px auto",
    borderColor: "#6a5bcdff",
};

function TodoList({ todos, onCompleteTodo, onUpdateTodo, isLoading }) {
    const [currEditingId, setCurrEditingId] = useState(null);

    return (
        <div className={styles.mainContent}>
            {
                isLoading ?
                    <>
                        <ClipLoader
                            cssOverride={override}
                            size={65}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </>
                    :

                    <ul>
                        {todos.map(todo => {
                            return <TodoListItem
                                key={todo.id}
                                todo={todo}
                                onCompleteTodo={() => onCompleteTodo(todo)}
                                onUpdateTodo={onUpdateTodo}
                                currEditingId={currEditingId}
                                setCurrEditingId={setCurrEditingId} />;
                        })}
                    </ul>
            }
        </div>
    );
}

export default TodoList;
