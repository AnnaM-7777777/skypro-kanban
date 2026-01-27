import styled, { keyframes } from "styled-components";

// Анимация карточки
const cardAnimation = keyframes`
    0% {
        height: 0;
        opacity: 0;
    }

    100% {
        height: auto;
        opacity: 1;
    }
`;

export const SCardItem = styled.div`
    animation-name: ${cardAnimation};
    animation-duration: 500ms;
    animation-timing-function: linear;
`;

export const SCardsCard = styled.div`
    width: 220px;
    height: 130px;
    background-color: #ffffff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: stretch;
    padding: 15px 13px 19px;
`;

export const SCardGroup = styled.div`
    width: 100%;
    height: 20px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

// Цветовые темы по категориям
const topicThemes = {
    "Web Design": {
        backgroundColor: "#ffe4c2",
        color: "#ff6d00",
    },
    Research: {
        backgroundColor: "#b4fdd1",
        color: "#06b16e",
    },
    Copywriting: {
        backgroundColor: "#e9d4ff",
        color: "#9a48f1",
    },
    default: {
        backgroundColor: "#eaeef6",
        color: "#94a6be",
    },
};

export const SCardTheme = styled.div`
    width: auto;
    height: 20px;
    padding: 5px 14px;
    border-radius: 18px;
    font-size: 10px;
    font-weight: 600;
    line-height: 10px;

    ${({ $topic }) => {
        const theme = topicThemes[$topic] || topicThemes.default;
        
        return `
            background-color: ${theme.backgroundColor};
            color: ${theme.color};
        `;
    }}
`;

export const SCardBtn = styled.button`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 2px;
    border: none;
    background-color: rgba(255, 255, 255, 0);
    /* cursor: pointer;
    outline: none; */
`;

export const SCardBtnDiv = styled.div`
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #94a6be;
`;

export const SCardContent = styled.div`
    height: 64px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
`;

export const SCardTitle = styled.h3`
    height: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    margin-bottom: 10px;
    text-align: left;
`;

export const SCardDate = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    height: 16px;
    width: 80px;

    svg {
        width: 13px;
    }
`;

export const SCardDateP = styled.p`
    margin-left: 6px;
    font-size: 10px;
    line-height: 13px;
    color: #94a6be;
    letter-spacing: 0.2px;
`;
