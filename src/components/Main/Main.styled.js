import styled from "styled-components";

export const SMain = styled.main`
    width: 100%;
    transition:
        background-color 0.3s ease,
        color 0.3s ease;
`;

export const SMainContent = styled.div`
    display: flex;
    column-gap: 19px;

    @media (max-width: 1024px) {
        flex-direction: column;
    }
`;

export const SMainColumn = styled.div`
    width: 20%;
    min-width: 220px;

    @media screen and (max-width: 1024px) {
        width: 100%;

        margin: 0 auto;
        display: block;
    }
`;
