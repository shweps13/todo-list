import { useState } from 'react';
import TodoListItem from './TodoListItem'

function TodoList({ todos, onCompleteTodo, onUpdateTodo, isLoading }) {
    const [currEditingId, setCurrEditingId] = useState(null);

    return (
        <div>
            {
                isLoading ?  <p>ToDo list is loading...</p> :

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
