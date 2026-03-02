import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.bgMain};
    box-sizing: border-box;
    padding-left: calc(50% - 600px);
    padding-right: calc(50% - 600px);

    @media screen and (max-width: 660px) {
        height: calc(100vh - 70px);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
    }
`;

export const NoTasksText = styled.p`
    font-size: 18px;
    color: #94a6be;
    text-align: center;
    margin-top: 40px;
`;

export const MobileCreateButton = styled.button`
    display: none;

    @media screen and (max-width: 660px) {
        display: flex;
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        max-width: 400px;
        height: 50px;
        border-radius: 8px;
        background-color: ${({ theme }) => theme.colors.primary};
        color: rgba(255, 255, 255, 1);
        border: none;
        font-size: 16px;
        font-weight: 500;
        justify-content: center;
        align-items: center;
        z-index: 999;
        cursor: pointer;

        &:hover {
            background-color: ${({ theme }) => theme.colors.primaryHover};
        }

        a {
            color: rgba(255, 255, 255, 1);
            text-decoration: none;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`;
