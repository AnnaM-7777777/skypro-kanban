import styled from "styled-components";

export const SHeader = styled.header`
    width: 100%;
    margin: 0 auto;
    background-color: #ffffff;
`;

export const SHeaderBlock = styled.header`
    height: 70px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    position: relative;
    top: 0;
    left: 0;
`;

export const LogoWrapper = styled.div`
    width: 85px;

    a {
        display: block;
        img {
            width: 100%;
            display: block;
        }
    }
`;

export const Nav = styled.nav`
    display: flex;
    align-items: center;
    gap: 20px;
    max-width: 290px;
`;

export const CreateButton = styled.button`
    width: 178px;
    height: 30px;
    border-radius: 4px;
    background-color: #565eef;
    border: none;
    color: white;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    outline: none;

    &:hover {
        background-color: #565eef;
    }
`;

export const UserWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

export const UserButton = styled.button`
    display: flex;
    align-items: center;
    gap: 5px;
    height: 100%;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 10px;
    color: #565eef;
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;

    &::after {
        content: "";
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 1px;
        border-left: 1.9px solid #565eef;
        border-bottom: 1.9px solid #565eef;
        transform: rotate(-45deg);
        padding: 0;
    }

    &:hover,
    &:focus {
        color: #565eef;
        &::after {
            border-left-color: #565eef;
            border-bottom-color: #565eef;
        }
    }
`;
