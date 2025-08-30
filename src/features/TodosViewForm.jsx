
function TodosViewForm({sortField, setSortField, sortDirection, setSortDirection}) {

    const preventRefresh = (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={(e) => preventRefresh(e)}>
            <label>Sort by</label>
            <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
                <option value='title'>Title</option>
                <option value='createdTime'>Time added</option>
            </select>
            <label>Direction</label>
            <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
                <option value='asc'>Ascending</option>
                <option value='desc'>Descending</option>
            </select>
        </form>
    )
}

export default TodosViewForm;