import styled from "styled-components";

export const SCalendar = styled.div`
    width: 182px;
    margin-bottom: 20px;

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

export const SCalendarBlock = styled.div`
    display: block;
`;

export const SCalendarNav = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 14px;
    padding: 0 7px;

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

    &._cell-day:hover {
        color: #94a6be;
        background-color: #eaeef6;
    }

    &._active-day {
        background-color: #94a6be;
        color: #ffffff;
    }

    &._current {
        font-weight: 700;
    }

    &._weekend {
        /* Специфичные стили для выходных можно добавить здесь */
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
