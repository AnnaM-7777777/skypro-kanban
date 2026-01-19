import {
    SCalendar,
    SCalendarTitle,
    SCalendarBlock,
    SCalendarNav,
    SCalendarMonth,
    SNavActions,
    SNavAction,
    SCalendarContent,
    SCalendarDaysNames,
    SCalendarDayName,
    SCalendarCells,
    SCalendarCell,
    SCalendarPeriod,
    SCalendarP,
} from "./Calendar.styled";

// Формат: DD.MM.YYYY
const formatDate = (day, monthStr, yearStr) => {
    const dayStr = String(day).padStart(2, "0");
    const monthMap = {
        Январь: "01",
        Февраль: "02",
        Март: "03",
        Апрель: "04",
        Май: "05",
        Июнь: "06",
        Июль: "07",
        Август: "08",
        Сентябрь: "09",
        Октябрь: "10",
        Ноябрь: "11",
        Декабрь: "12",
    };
    const monthNum = monthMap[monthStr.split(" ")[0]] || "09"; // fallback на сентябрь
    return `${dayStr}.${monthNum}.${yearStr}`;
};

export default function Calendar({
    month = "Январь 2026",
    selectedDate = "16.01.2026",
    onDateSelect,
}) {
    // Разбиваем месяц и год
    const [monthName, year] = month.split(" ");

    // Дни месяца (статичные)
    // Январь 2026 начинается с четверга (1-е число — индекс 3)
    const days = [
        // дек 2025: вс, пн, вт, ср
        28, 29, 30, 31,
        // янв 2026
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        // фев 2026: вс
        1,
    ];
    // Сегодняшняя дата (для выделения жирным)
    const today = new Date();
    const todayString = `${String(today.getDate()).padStart(2, "0")}.${String(
        today.getMonth() + 1
    ).padStart(2, "0")}.${today.getFullYear()}`;

    const handleDayClick = (day) => {
        const formattedDate = formatDate(day, monthName, year);
        if (onDateSelect) {
            onDateSelect(formattedDate);
        }
    };

    return (
        <SCalendar>
            <SCalendarTitle>Даты</SCalendarTitle>

            <SCalendarBlock>
                <SCalendarNav>
                    <SCalendarMonth>{month}</SCalendarMonth>
                    <SNavActions>
                        <SNavAction data-action="prev">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="6"
                                height="11"
                                viewBox="0 0 6 11"
                            >
                                <path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z" />
                            </svg>
                        </SNavAction>
                        <SNavAction data-action="next">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="6"
                                height="11"
                                viewBox="0 0 6 11"
                            >
                                <path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z" />
                            </svg>
                        </SNavAction>
                    </SNavActions>
                </SCalendarNav>

                <SCalendarContent>
                    <SCalendarDaysNames>
                        {["пн", "вт", "ср", "чт", "пт", "сб", "вс"].map(
                            (day, i) => (
                                <SCalendarDayName key={i}>
                                    {day}
                                </SCalendarDayName>
                            )
                        )}
                    </SCalendarDaysNames>
                    <SCalendarCells>
                        {days.map((day, i) => {
                            const isOtherMonth = i < 3 || i >= 30;
                            const isCurrent = formatDate(day, monthName, year) === todayString;
                            const isSelected = selectedDate && formatDate(day, monthName, year) === selectedDate;
                            const isWeekend = [
                                5, 6, 12, 13, 19, 20, 26, 27,
                            ].includes(i);

                            return (
                                <SCalendarCell
                                    key={i}
                                    className={`
                                        ${
                                            isOtherMonth
                                                ? "_other-month"
                                                : "_cell-day"
                                        }
                                        ${isCurrent ? "_current" : ""}
                                        ${isWeekend ? "_weekend" : ""}
                                        ${isSelected ? "_active-day" : ""}
                                    `}
                                    onClick={() =>
                                        !isOtherMonth && handleDayClick(day)
                                    }
                                    style={{
                                        cursor: isOtherMonth
                                            ? "default"
                                            : "pointer",
                                        opacity: isOtherMonth ? 0 : 1,
                                    }}
                                >
                                    {day}
                                </SCalendarCell>
                            );
                        })}
                    </SCalendarCells>
                </SCalendarContent>
            </SCalendarBlock>
        </SCalendar>
    );
}
