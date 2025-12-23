import styled from "styled-components";

export const SColumn = styled.div`
    width: 20%;
    display: block;

    @media screen and (max-width: 1200px) {
        width: 100%;
        margin: 0 auto;
        display: block;
    }
`;

export const SColumnTitle = styled.div`
    margin-bottom: 20px;
    text-align: left;
`;

export const SColumnTitleP = styled.p`
    color: #94a6be;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
`;

export const SCards = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    position: relative;

    @media screen and (max-width: 1200px) {
        width: 100%;
        display: flex;
        overflow-y: auto;
    }
`;

export const EmptyMessage = styled.div`
    color: #94a6be;
    font-size: 14px;
    font-style: italic;
    text-align: center;
    padding: 20px 0;
`;
