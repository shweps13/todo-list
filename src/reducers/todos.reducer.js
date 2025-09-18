const initialState = {
    todoList: [],
    isLoading: false,
    isSaving: false,
    errorMessage: ""
}

const actions = {
    //actions in useEffect that loads todos
    fetchTodos: 'fetchTodos',
    loadTodos: 'loadTodos',
    //found in useEffect and addTodo to handle failed requests
    setLoadError: 'setLoadError',
    //actions found in addTodo
    startRequest: 'startRequest',
    addTodo: 'addTodo',
    endRequest: 'endRequest',
    //found in helper functions 
    updateTodo: 'updateTodo',
    completeTodo: 'completeTodo',
    //reverts todos when requests fail
    revertTodo: 'revertTodo',
    //action on Dismiss Error button
    clearError: 'clearError',
};


function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.fetchTodos:
            return {
                isLoading: true,
                ...state
            }
        case actions.loadTodos:
            const fetchedToDos = action.records.map((record) => ({
                id: record.id,
                isCompleted: record.fields.isCompleted ?? false,
                title: record.fields.title ?? "",
            }));
            return {
                todoList: fetchedToDos,
                isLoading: false,
                ...state,
            };
        case actions.setLoadError:
            return {
                errorMessage: action.error.message,
                isLoading: false,
                ...state,
            };

        case actions.startRequest:
            return {
                isSaving: true,
                ...state,
            };
        case actions.addTodo:
            const savedTodo = {
                id: action.records[0].id,
                title: action.records[0].fields?.title ?? "",
                isCompleted: !!action.records[0].fields?.isCompleted,
            };
            return {
                todoList: [...state.todoList, savedTodo],
                isSaving: false,
                ...state,
            };
        case actions.endRequest:
            return {
                isSaving: false,
                ...state,
            };

        case actions.revertTodo:
        case actions.updateTodo:
            const updatedTodos = state.todoList.map((todo) => 
                todo.id === action.editedTodo.id ? { ...todo, title: action.editedTodo.title } : todo
            );
            const updatedState = {
                todoList: updatedTodos,
                isSaving: false,
                ...state,
            };
            if (action.error) {
                updatedState.errorMessage = action.error.message;
            }
            return updatedState;
        case actions.completeTodo:
            const completedTodos = state.todoList.map((todo) => 
                todo.id === action.completedTodo.id ? { ...todo, isCompleted: true } : todo
            );
            return {
                todoList: completedTodos,
                isSaving: false,
                ...state,
            };
        case actions.clearError:
            return {
                errorMessage: "",
                ...state,
            };
    }
}

export { initialState, actions }