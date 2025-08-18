import { useState } from 'react';
import TodoListItem from './TodoListItem'

function TodoList({ todos, onCompleteTodo, onUpdateTodo }) {
    const [currEditingId, setCurrEditingId] = useState(null);

    return (
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
    );
}

export default TodoList;
