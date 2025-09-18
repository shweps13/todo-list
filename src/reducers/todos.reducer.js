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
                ...state,
                isLoading: true
            }
        case actions.loadTodos:
            const fetchedToDos = action.records.map((record) => ({
                id: record.id,
                isCompleted: record.fields.isCompleted ?? false,
                title: record.fields.title ?? "",
            }));
            const newState = {
                ...state,
                todoList: fetchedToDos,
                isLoading: false,
            };
            return newState;
        case actions.setLoadError:
            return {
                ...state,
                errorMessage: action.error.message || "Unknown error",
                isLoading: false,
            };

        case actions.startRequest:
            return {
                ...state,
                isSaving: true,
            };
        case actions.addTodo:
            const savedTodo = {
                id: action.records[0].id,
                title: action.records[0].fields?.title ?? "",
                isCompleted: !!action.records[0].fields?.isCompleted,
            };
            return {
                ...state,
                todoList: [...state.todoList, savedTodo],
                isSaving: false,
            };
        case actions.endRequest:
            return {
                isSaving: false,
                ...state,
            };

        case actions.revertTodo:
        case actions.updateTodo:
            const updatedTodos = state.todoList.map((todo) => 
                todo.id === action.records[0].id ? { ...todo, title: action.records[0].title } : todo
            );
            const updatedState = {
                ...state,
                todoList: updatedTodos,
                isSaving: false,
            };
            if (action.error) {
                updatedState.errorMessage = action.error.message;
            }
            return updatedState;
        case actions.completeTodo:
            const completedTodos = state.todoList.map((todo) => 
                todo.id === action.records[0].id ? { ...todo, isCompleted: true } : todo
            );
            return {
                ...state,
                todoList: completedTodos,
                isSaving: false,
            };
        case actions.clearError:
            return {
                ...state,
                errorMessage: "",
            };
    }
}

export { initialState, actions, reducer }