import TodoListItem from './TodoListItem'

function TodoList({todos, onCompleteTodo, onUpdateTodo}) {

    return (
        <ul>
            {todos.map(todo => {
                return <TodoListItem key={todo.id} todo={todo} onUpdateTodo={onUpdateTodo} onCompleteTodo={() => onCompleteTodo(todo)} />;
            })}
        </ul>
    );
}

export default TodoList;
