import styled from "styled-components";

export const Bg = styled.div`
    min-height: 100vh;
    background: ${({ theme }) =>
        theme.mode === "dark" ? "#151419" : "rgba(234, 238, 246, 1)"};
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 430px) {
        background: ${({ theme }) =>
            theme.mode === "dark" ? "#151419" : "rgba(255, 255, 255, 1)"};
    }
`;

export const Modal = styled.div`
    width: 368px;
    padding: 50px 60px;
    box-sizing: border-box;
    border-radius: 10px;

    background: ${({ theme }) =>
        theme.mode === "dark" ? "#20202C" : "rgba(255, 255, 255, 1)"};

    border: 1px solid
        ${({ $isDark }) =>
            $isDark ? "rgba(148, 166, 190, 0.4)" : " rgba(0,0,0,0.1)"};

    @media screen and (max-width: 430px) {
        background: ${({ theme }) =>
            theme.mode === "dark" ? "#151419" : "rgba(255, 255, 255, 1)"};
        border: none;
        padding: 16px;
        width: 100%;
    }
`;

export const ModalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const Title = styled.h2`
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    color: ${({ theme }) =>
        theme.mode === "dark" ? "#FFFFFF" : "rgba(0, 0, 0, 1)"};
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 7px;
`;

export const Input = styled.input`
    min-height: 30px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 14px;
    box-sizing: border-box;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.2s ease;

    border: 1px solid
        ${({ $error, theme }) =>
            $error
                ? "rgba(248, 77, 77, 1)"
                : theme.mode === "dark"
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(148, 166, 190, 0.4)"};

    background-color: ${({ theme }) =>
        theme.mode === "dark" ? "#20202C" : "rgba(255, 255, 255, 1)"};

    color: ${({ theme }) =>
        theme.mode === "dark" ? "#FFFFFF" : "rgba(0, 0, 0, 1)"};

    &::placeholder {
        color: ${({ theme }) =>
            theme.mode === "dark"
                ? "rgba(255, 255, 255, 0.6)"
                : "rgba(0, 0, 0, 0.5)"};
        opacity: 1;
    }

    @media screen and (max-width: 660px) {
        min-height: 40px;
    }

    @media screen and (max-width: 430px) {
        border-radius: 4px;
    }
`;

export const Button = styled.button`
    min-height: 30px;
    margin-top: 13px;
    padding: 4.5px;
    font-size: 14px;
    font-weight: 500;
    text-align: center;

    background-color: ${({ disabled }) =>
        disabled ? "rgba(148, 166, 190, 0.6)" : "#4b6cf7"};

    color: rgba(255, 255, 255, 1);
    border: none;
    border-radius: 6px;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    transition: background-color 0.2s ease;

    &:disabled {
        opacity: 1;
    }

    @media screen and (max-width: 660px) {
        min-height: 40px;
        margin-top: 5px;
    }

    @media screen and (max-width: 430px) {
        border-radius: 4px;
    }
`;

export const FormGroup = styled.div`
    margin-top: 10px;
    font-size: 14px;
    text-align: center;
    color: rgba(148, 166, 190, 0.4);

    a {
        margin-left: 5px;
        cursor: pointer;
        color: rgba(148, 166, 190, 0.4);
        text-decoration: underline;

        &:hover {
            opacity: 0.8;
        }
    }

    @media screen and (max-width: 430px) {
        width: 200px;
        margin-left: auto;
        margin-right: auto;
    }
`;

export const ErrorText = styled.p`
    color: rgba(248, 77, 77, 1);
    font-size: 12px;
    text-align: center;
`;
