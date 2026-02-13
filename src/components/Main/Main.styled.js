import styled from "styled-components";

export const SMain = styled.main`
    width: 100%;
    height: 90vh;
    padding: 40px 0 64px 0;
    background-color: #eaeef6;
`;

export const SMainBlock = styled.div`
    width: 100%;
`;

export const SMainContent = styled.div`
    width: 100%;
    display: flex;
    column-gap: 19px;
    overflow-x: auto;
    padding: 16px 0;

    @media screen and (max-width: 1200px) {
        flex-wrap: wrap;
        column-gap: 16px;
    }
`;

export const SMainColumn = styled.div`
    width: 20%;
    display: block;

    @media screen and (max-width: 1200px) {
        width: 100%;
        margin: 0 auto;
        display: block;
    }
`;

/* export const ErrorContainer = styled.div`
    padding: 40px;
    text-align: center;
    background-color: #ffebee;
    border-radius: 8px;
    margin: 20px 0;

    p {
        color: #c62828;
        margin-bottom: 16px;
    }

    button {
        padding: 8px 16px;
        background-color: #c62828;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
            background-color: #b71c1c;
        }
    }
`; */
