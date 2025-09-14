
function TextInputWithLabel({
    elementId,
    label,
    onChange,
    ref,
    value
}) {
    
    return (
        <>
            <label htmlFor={elementId}>{label}</label>
            <input
                type="text"
                id={elementId}
                name="title"
                placeholder="Add a new todo..."
                ref={ref}
                value={value}
                onChange={onChange}
            />
        </>
    )
}

export default TextInputWithLabel;