
import styled from 'styled-components';

const StyledLabel = styled.label`
    display: none;
`;

const StyledInput = styled.input`
    width: calc(100% - 60px);
    border: 1px solid lightgray;
    border-radius: 5px;
    padding-left: 10px;
    margin-top: 8px;
    height: 30px;
    
    &::placeholder {
        color: grey;
        padding-left: 5px;
    }
    
    &:focus {
        outline-width: 0;
    }
`;

function TextInputWithLabel({
    elementId,
    label,
    onChange,
    ref,
    value
}) {
    
    return (
        <>
            <StyledLabel htmlFor={elementId}>{label}</StyledLabel>
            <StyledInput
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