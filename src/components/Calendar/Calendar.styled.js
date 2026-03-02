/* import styled from "styled-components";

export const SCalendar = styled.div`
    width: 182px;

    @media screen and (max-width: 660px) {
        display: none;
        margin-bottom: 7px;
        max-width: 340px;
        width: 100%;
    }
`;

export const SCalendarTitle = styled.p`
    color: #000;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    margin-bottom: 14px;
    padding: 0 7px;

    @media screen and (max-width: 660px) {
        padding: 0;
    }
`;

export const SSCalendarBlock = styled.div`
    display: block;
`;

export const SSCalendarNav = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 14px;
    padding-left: 7px;

    @media screen and (max-width: 660px) {
        padding: 0;
    }
`;

export const SCalendarMonth = styled.div`
    color: #94a6be;
    font-size: 14px;
    line-height: 25px;
    font-weight: 600;
`;

export const SNavActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const SNavAction = styled.div`
    width: 18px;
    height: 25px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        fill: #94a6be;
    }
`;

export const SCalendarContent = styled.div`
    margin-bottom: 12px;
`;

export const SCalendarDaysNames = styled.div`
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    margin: 7px 0;
    padding: 0 7px;
`;

export const SCalendarDayName = styled.div`
    color: #94a6be;
    font-size: 10px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.2px;

    @media screen and (max-width: 660px) {
        font-size: 14px;
    }
`;

export const SCalendarCells = styled.div`
    width: 182px;
    height: 126px;
    display: flex;
    flex-wrap: wrap;

    @media screen and (max-width: 660px) {
        width: 344px;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
`;

export const SCalendarCell = styled.div`
    width: 22px;
    height: 22px;
    margin: 2px;
    border-radius: 50%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    color: #94a6be;
    font-size: 10px;
    line-height: 1;
    letter-spacing: -0.2px;
    cursor: pointer;

    &._other-month {
        opacity: 0;
    }

    // При наведении — светло-серый фон
    &:not(._other-month):hover:not(._active-day) {
        background-color: #eaeef6;
        color: #94A6BE;
    }

    // Активная дата — тёмный фон, белый текст
    &._active-day {
        background-color: #94A6BE;
        color: rgba(255, 255, 255, 1);
    }

    // Сегодня — только жирный текст, без фона
    &._current {
        font-weight: 700;
        color: #94A6BE;
    }

    @media screen and (max-width: 660px) {
        width: 42px;
        height: 42px;
        font-size: 14px;
    }
`;

export const SCalendarPeriod = styled.div`
    padding: 0 7px;

    @media screen and (max-width: 660px) {
        padding: 0;
    }
`;

export const SCalendarP = styled.p`
    color: #94a6be;
    font-size: 10px;
    line-height: 1;

    span {
        color: #000000;
    }

    @media screen and (max-width: 660px) {
        font-size: 14px;
    }
`;
 */

import styled from "styled-components";

export const SCalendarCompact = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 6px;
    width: 100%;
`;

export const SCalendarImgDate = styled.div`
    display: flex;
`;

export const SCalendar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
`;

export const SCalendarTitle = styled.p`
    margin-bottom: 14px;
`;

export const SCalendarNav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 12px;
`;

export const SCalendarMonth = styled.div`
    font-size: 14px;
    font-weight: 600;
    color: #94a6be;
    text-transform: capitalize;
`;

export const SCalendarNavActions = styled.div`
    display: flex;
    gap: 12px;
`;

export const SCalendarNavAction = styled.div`
    cursor: pointer;
    font-size: 16px;
    color: #94a6be;
`;

export const SCalendarContent = styled.div`
    width: 100%;
`;

export const SCalendarDaysNames = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 12px;

    @media screen and (max-width: 660px) {
        padding: 0px 15px;
    }
`;

export const SCalendarDayName = styled.div`
    font-size: 10px;
    color: #94a6be;

    @media screen and (max-width: 660px) {
        font-size: 14px;
    }
`;

export const SCalendarText = styled.p`
    color: #94a6be;
    font-size: 10px;
    line-height: 1;

    @media screen and (max-width: 660px) {
        font-size: 14px;
        padding: 0px;
    }
`;

export const SCalendarCells = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 14px;
`;

export const SCalendarCell = styled.div`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    cursor: pointer;

    color: ${({ $today }) => ($today ? "#94A6BE" : "#94a6be")};
    font-weight: ${({ $today }) => ($today ? 700 : 400)};

    &:hover {
        background-color: #eaeef6;
    }

    &._active-day {
        background-color: #94a6be;
        color: rgba(255, 255, 255, 1);
        font-weight: 700;
    }

    &._other-month {
        opacity: 0.4;
        pointer-events: none;
    }

    @media screen and (max-width: 660px) {
        width: 42px;
        height: 42px;
        font-size: 14px;
    }
`;

export const SCalendarPeriod = styled.div`
    

    @media screen and (max-width: 660px) {
        padding: 0px;
    }
`;

export const SCalendarPeriodText = styled.p`
    font-size: 10px;
    color: #94a6be;

    span {
        color: ${({ theme }) => theme.colors.text};
        font-weight: 500;
    }

    @media screen and (max-width: 660px) {
        font-size: 14px;
    }
`;

