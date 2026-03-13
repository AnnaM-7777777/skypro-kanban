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

    @media (max-width: 1024px) {
        padding-left: 16px;
        padding-right: 16px;
    }
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
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
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
        bottom: 30px;
        left: 16px;
        right: 16px;
        width: calc(100% - 32px);
        height: 40px;
        border: none;
        border-radius: 4px;
        background-color: rgba(86, 94, 239, 1);

        a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            color: rgba(255, 255, 255, 1);
            font-family: Roboto;
            font-weight: 500;
            font-size: 14px;
            line-height: 100%;
            cursor: pointer;
        }
    }
`;
