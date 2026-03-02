import styled from "styled-components";

export const NotFoundWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    background-color: #1e1e2f;
`;

export const NotFoundTitle = styled.h1`
    font-size: 96px;
    font-weight: 700;
    color: rgba(255, 255, 255, 1);
`;

export const NotFoundText = styled.p`
    font-size: 20px;
    color: rgba(148, 166, 190, 0.8);
`;

export const BackButton = styled.button`
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    background-color: #4b6cf7;
    border: none;
    border-radius: 6px;
    cursor: pointer;
`;
