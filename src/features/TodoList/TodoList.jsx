import TodoListItem from './TodoListItem'

function TodoList({todos, onCompleteTodo}) {

    return (
        <ul>
            {todos.map(todo => {
                return <TodoListItem key={todo.id} todo={todo} onCompleteTodo={() => onCompleteTodo(todo)} />;
            })}
        </ul>
    );
}

export default TodoList;
