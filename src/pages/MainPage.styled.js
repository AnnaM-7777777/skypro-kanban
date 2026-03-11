import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.bgMain};
    box-sizing: border-box;
    padding: 40px calc(50% - 600px);

    @media (max-width: 1024px) {
        padding: 30px 16px;
        height: calc(100vh - 70px);

        /* Включаем скролл */
        overflow-y: hidden;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch; /* Плавный скролл на iOS */

        /* === СКРЫВАЕМ СКРОЛЛБАР === */

        /* Для Firefox */
        scrollbar-width: none;

        /* Для Internet Explorer и Edge (старые версии) */
        -ms-overflow-style: none;

        /* Для Chrome, Safari, Opera, Edge (новые версии) */
        &::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
        }
    }
`;

export const NoTasksText = styled.p`
    font-size: 18px;
    color: #94a6be;
    text-align: center;
`;
