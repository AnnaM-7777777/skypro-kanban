import styled, { keyframes } from "styled-components";
import {
    SCardItem,
    SCardsCard,
    SCardGroup,
    SCardContent,
    SCardTitle,
    SCardDate,
} from "./Card.styled";

// Определяем keyframes
const pulse = keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
`;

// Используем его напрямую в стилях
const skeletonBase = `
    background: #e0e0e0;
    border-radius: 4px;
    animation: ${pulse} 1.5s infinite ease-in-out;
`;

export const SCardLoaderTheme = styled.div`
    width: auto;
    height: 20px;
    padding: 5px 14px;
    border-radius: 18px;
    background-color: #eaeef6;
    ${skeletonBase}
`;

export const SCardLoaderBtn = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 2px;
    ${skeletonBase}
    border-radius: 4px;
`;

export const SCardLoaderTitle = styled(SCardTitle)`
    ${skeletonBase}
    height: 20px;
    margin-bottom: 8px;
    color: transparent !important; /* скрываем текст, если вдруг появится */
`;

export const SCardLoaderDate = styled(SCardDate)`
    ${skeletonBase}
    width: 80px;
    height: 16px;
    color: transparent !important;
    svg {
        display: none; /* скрываем иконку даты */
    }
`;

// Повторяем структуру Card
export const SCardLoaderItem = styled(SCardItem)``;

export const SCardLoaderCard = styled(SCardsCard)``;

export const SCardLoaderGroup = styled(SCardGroup)``;

export const SCardLoaderContent = styled(SCardContent)``;