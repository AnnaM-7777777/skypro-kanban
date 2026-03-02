import styled from "styled-components";

export const LoginForm = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: ${({ $isDark }) =>
        $isDark ? "#151419" : "rgba(234, 238, 246, 1)"};
`;

export const LoginWrapper = styled.div`
    width: 368px;
    min-height: 329px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 50px 60px;
    background: ${({ $isDark }) =>
        $isDark ? "#20202C" : "rgba(255, 255, 255, 1)"};
    border-radius: 8px;
    border: 1px solid
        ${({ $isDark }) =>
            $isDark ? "rgba(148, 166, 190, 0.4)" : " rgba(0,0,0,0.1)"};

    @media screen and (max-width: 660px) {
        background: ${({ $isDark }) =>
            $isDark ? "#151419" : "rgba(234, 238, 246, 1)"};
        border: none;
        padding: 16px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 7px;
    }
`;

export const Title = styled.h1`
    font-family: Roboto;
    font-weight: 700;
    font-size: 20px;
    text-align: center;
    color: ${({ $isDark }) => ($isDark ? "#FFFFFF" : "#000000")};
`;

export const Input = styled.input`
    width: 100%;
    padding: 8px 10px;
    font-family: Roboto;
    font-size: 14px;
    box-sizing: border-box;
    border-radius: 8px;
    outline: none;

    border: 1px solid
        ${({ $error, $isDark }) =>
            $error
                ? "rgba(248, 77, 77, 1)"
                : $isDark
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(148, 166, 190, 0.4)"};

    background-color: ${({ $isDark }) =>
        $isDark ? "#20202C" : "rgba(255, 255, 255, 1)"};
    color: ${({ $isDark }) => ($isDark ? "#FFFFFF" : "#000000")};

    &::placeholder {
        color: ${({ $isDark }) =>
            $isDark ? "rgba(255,255,255,0.6)" : "rgba(148,166,190,1)"};
    }

    @media screen and (max-width: 660px) {
        background: ${({ $isDark }) =>
            $isDark ? "#151419" : "rgba(234, 238, 246, 1)"};
        min-height: 40px;
    }
`;

export const Button = styled.button`
    width: 100%;
    padding: 8px 10px;
    margin-top: 13px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    background: ${({ disabled }) => (disabled ? "rgba(148, 166, 190, 1)" : "rgba(86, 94, 239, 1)")};
    border: none;
    border-radius: 4px;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

    @media screen and (max-width: 660px) {
        min-height: 40px;
    }
`;

export const ErrorText = styled.p`
    font-family: Arial;
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    text-align: center;
    color: rgba(248, 77, 77, 1);
`;

export const RegisterLink = styled.div`
    text-align: center;
    font-family: Roboto;
    font-size: 14px;
    color: rgba(148, 166, 190, 0.4);

    a {
        color: rgba(148, 166, 190, 0.4);
        text-decoration: underline;
        cursor: pointer;

        &:hover {
            opacity: 0.8;
        }
    }
    @media screen and (max-width: 660px) {
        display: flex;
        flex-direction: column;
    }
`;
