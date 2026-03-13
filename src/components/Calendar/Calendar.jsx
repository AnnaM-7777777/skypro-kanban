import { useState, useEffect } from "react";
import {
    SCalendar,
    SCalendarCompact,
    SCalendarImgDate,
    SCalendarTitle,
    SCalendarNav,
    SCalendarMonth,
    SCalendarNavActions,
    SCalendarNavAction,
    SCalendarContent,
    SCalendarDaysNames,
    SCalendarDayName,
    SCalendarCells,
    SCalendarCell,
    SCalendarPeriod,
    SCalendarText,
    SCalendarPeriodText,
} from "./Calendar.styled";

const DAYS = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

function parseDate(dateStr) {
    if (!dateStr) return null;

    const parts = dateStr.split(".");
    if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    }

    const d = new Date(dateStr);
    return isNaN(d) ? null : d;
}

export default function Calendar({ date, variant = "full", onChange }) {
    const initialDate = parseDate(date) || null;
    const [currentDate, setCurrentDate] = useState(initialDate || new Date());
    const [selectedDate, setSelectedDate] = useState(initialDate);

    useEffect(() => {
        const parsed = parseDate(date);

        if (!parsed) {
            setTimeout(() => {
                setSelectedDate(null);
                setCurrentDate(new Date());
            }, 0);
            return;
        }

        setTimeout(() => {
            setSelectedDate(parsed);
            setCurrentDate(parsed);
        }, 0);
    }, [date]);

    if (variant === "compact") {
        let formattedDate = "Без даты";

        if (selectedDate) {
            const day = String(selectedDate.getDate()).padStart(2, "0");
            const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
            const year = String(selectedDate.getFullYear()).slice(-2);
            formattedDate = `${day}.${month}.${year}`;
        }

        return (
            <SCalendar>
                <SCalendarCompact>
                    <SCalendarImgDate>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="13"
                            viewBox="0 0 13 13"
                            fill="none"
                        >
                            <path
                                d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z"
                                stroke="#94A6BE"
                                strokeWidth="0.8"
                            />
                            <path
                                d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125M9.75 1.21875V2.03125"
                                stroke="#94A6BE"
                                strokeWidth="0.8"
                                strokeLinecap="round"
                            />
                        </svg>
                    </SCalendarImgDate>

                    <SCalendarText>{formattedDate}</SCalendarText>
                </SCalendarCompact>
            </SCalendar>
        );
    }

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDay =
        firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;

    const daysInMonth = lastDayOfMonth.getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const cells = [];

    // предыдущий месяц
    for (let i = startDay - 1; i >= 0; i--) {
        cells.push({ day: prevMonthDays - i, otherMonth: true });
    }

    // текущий месяц
    for (let i = 1; i <= daysInMonth; i++) {
        const dayOfWeek = new Date(year, month, i).getDay();
        const isActive =
            selectedDate &&
            selectedDate.getDate() === i &&
            selectedDate.getMonth() === month &&
            selectedDate.getFullYear() === year;

        cells.push({
            day: i,
            current:
                i === new Date().getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear(),
            active: isActive,
            weekend: dayOfWeek === 0 || dayOfWeek === 6,
        });
    }

    // следующий месяц
    while (cells.length % 7 !== 0) {
        cells.push({ day: "", otherMonth: true });
    }

    const changeMonth = (direction) => {
        setCurrentDate(
            new Date(year, month + (direction === "next" ? 1 : -1), 1),
        );
    };
    const handleSelectDay = (day) => {
        const newDate = new Date(year, month, day);

        setSelectedDate(newDate);
        setCurrentDate(newDate);

        if (onChange) {
            onChange(newDate.toISOString());
        }
    };

    return (
        <SCalendar>
            <SCalendarTitle className="subttl">Даты</SCalendarTitle>

            <SCalendarNav>
                <SCalendarMonth>
                    {`${currentDate.toLocaleString("ru-RU", { month: "long" })} ${currentDate.getFullYear()}`}
                </SCalendarMonth>

                <SCalendarNavActions>
                    <SCalendarNavAction onClick={() => changeMonth("prev")}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="6"
                            height="11"
                            viewBox="0 0 6 11"
                        >
                            <path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z" />
                        </svg>
                    </SCalendarNavAction>

                    <SCalendarNavAction onClick={() => changeMonth("next")}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="6"
                            height="11"
                            viewBox="0 0 6 11"
                        >
                            <path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z" />
                        </svg>
                    </SCalendarNavAction>
                </SCalendarNavActions>
            </SCalendarNav>

            <SCalendarContent>
                <SCalendarDaysNames>
                    {DAYS.map((day) => (
                        <SCalendarDayName key={day}>{day}</SCalendarDayName>
                    ))}
                </SCalendarDaysNames>

                <SCalendarCells>
                    {cells.map((cell, index) => {
                        const isToday =
                            !cell.otherMonth &&
                            cell.day === new Date().getDate() &&
                            month === new Date().getMonth() &&
                            year === new Date().getFullYear();

                        return (
                            <SCalendarCell
                                key={index}
                                $today={isToday}
                                className={`
                                        ${cell.otherMonth ? "_other-month" : ""}
                                        ${cell.weekend ? "_weekend" : ""}
                                        ${cell.active ? "_active-day" : ""}
                                    `}
                                onClick={() =>
                                    !cell.otherMonth &&
                                    cell.day &&
                                    handleSelectDay(cell.day)
                                }
                            >
                                {cell.day}
                            </SCalendarCell>
                        );
                    })}
                </SCalendarCells>
            </SCalendarContent>

            <SCalendarPeriod>
                <SCalendarPeriodText>
                    {selectedDate ? (
                        <>
                            Срок исполнения:{" "}
                            <span>
                                {String(selectedDate.getDate()).padStart(2, "0")}.
                                {String(selectedDate.getMonth() + 1).padStart(2, "0")}.
                                {String(selectedDate.getFullYear()).slice(-2)}
                            </span>
                        </>
                    ) : (
                        "Выберите срок исполнения"
                    )}
                </SCalendarPeriodText>
            </SCalendarPeriod>
        </SCalendar>
    );
}
