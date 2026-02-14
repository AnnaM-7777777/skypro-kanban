import styled from "styled-components";

const StyledInput = styled.input`
    width: 100%;
    padding: 12px 16px;
    border: 1px solid ${(props) => (props.$error ? "#c62828" : "#ccc")};
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.3s;

    &:focus {
        outline: none;
        border-color: #2196f3;
    }
`;

const StyledTextarea = styled.textarea`
    width: 100%;
    padding: 12px 16px;
    border: 1px solid ${(props) => (props.$error ? "#c62828" : "#ccc")};
    border-radius: 4px;
    font-size: 14px;
    resize: vertical;
    min-height: 80px;
    transition: border-color 0.3s;

    &:focus {
        outline: none;
        border-color: #2196f3;
    }
`;

const BaseInput = ({
    tag = "input",
    id,
    name,
    placeholder = "",
    type = "text",
    error = false,
    onChange,
}) => {
    const Component = tag === "textarea" ? StyledTextarea : StyledInput;
    return (
        <Component
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            $error={error}
            onChange={onChange}
        />
    );
};

export default BaseInput;