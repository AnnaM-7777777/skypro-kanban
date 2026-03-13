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

    @media screen and (max-width: 660px) {
        width: 168px;
    }

    @media screen and (max-width: 495px) {
        width: 344px;
    }
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

    @media screen and (max-width: 495px) {
        width: 44px;
        height: 44px;
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
