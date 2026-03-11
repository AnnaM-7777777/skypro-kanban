import styled from "styled-components";
import { COLORS } from "../../utils/theme.js";

export const SColumn = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    /* @media screen and (max-width: 1200px) {
        width: 100%;
    } */
`;

export const SColumnTitle = styled.div`
    margin-bottom: 20px;

    p {
        color: #94a6be;
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
    }
`;

export const SCards = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: calc(130px * 5 + 10px * 4);
    padding-bottom: 160px;

    @media (max-width: 1024px) {
        min-height: 130px;
        flex-direction: row;
        padding-bottom: 20px;
        width: 100%;
    }
`;

export const DropZone = styled.div`
    width: 220px;
    height: 130px;
    border: 1px dashed ${COLORS.borderGrey};
    border-radius: 10px;
    margin-top: 5px;
    flex-shrink: 0;
    pointer-events: none;
`;
