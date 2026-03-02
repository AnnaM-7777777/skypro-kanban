import styled from "styled-components";
import { COLORS } from "../../utils/theme.js";

export const SHeader = styled.header`
    width: 100%;
    height: 70px;
    background-color: ${({ theme }) => theme.colors.bgHeader};
    color: ${({ theme }) => theme.colors.text};
    box-sizing: border-box;
    padding-left: calc(50% - 600px);
    padding-right: calc(50% - 600px);
`;

export const SHeaderBlock = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    position: relative;
`;

export const LogoWrapper = styled.div`
    img {
        width: 84px;
    }
`;

export const Nav = styled.nav`
    display: flex;
    gap: 20px;
    align-items: center;
    position: relative;
`;

export const CreateButton = styled.button`
    width: 178px;
    height: 30px;
    border-radius: 4px;
    background-color: ${COLORS.primaryBtn};
    border: none;
    cursor: pointer;

    a {
        color: ${COLORS.whiteTextBtn};
        font-family: "Roboto", Arial, Helvetica, sans-serif;
        font-size: 14px;
        font-weight: 500;
        text-decoration: none;
    }

    @media screen and (max-width: 660px) {
        display: none;
    }
`;

export const UserName = styled.button`
    background: none;
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.btnText};
    cursor: pointer;

    &::after {
        content: "";
        width: 6px;
        height: 6px;
        margin-left: 5px;
        border-left: 1.9px solid currentColor;
        border-bottom: 1.9px solid currentColor;
        transform: rotate(-45deg);
    }
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
        color: rgba(255, 255, 255, 1);
        border: none;
        font-size: 16px;
        font-weight: 500;
        justify-content: center;
        align-items: center;
        z-index: 999;
        cursor: pointer;

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
