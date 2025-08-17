
function TodoListItem({ todo, onCompleteTodo }) {
    return (
        <li>
            <form>
                <input type="checkbox" checked={todo.isCompleted} onChange={onCompleteTodo} />
                {todo.title}
            </form>
        </li>
    )
}

export default TodoListItem