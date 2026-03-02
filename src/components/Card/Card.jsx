import { useTheme } from "styled-components";
import Calendar from "../Calendar/Calendar";
import { getCategoryColors } from "../../utils/getCategoryColors";
import {
    CardWrapper,
    SCardGroup,
    CardTheme,
    CardBtn,
    SCardContent,
    SCardTitle,
    SCardDate,
    SkeletonOverlay,
    SkeletonLine,
} from "./Card.styled.js";
import { Link } from "react-router-dom";

const Card = ({ id, topic, title, date, isLoading }) => {
    const theme = useTheme();

    // Получаем стили через утилиту
    const { bg: bgColor, text: textColor } = getCategoryColors(
        topic,
        theme.mode,
    );

    const themeLabel = topic || "Other";

    return (
        <Link to={isLoading ? "#" : `/card/${id}`}>
            <CardWrapper>
                {isLoading && (
                    <SkeletonOverlay>
                        <SkeletonLine
                            $width="82px"
                            $height="20px"
                            $top="15px"
                            $left="13px"
                            $borderRadius="18px"
                            $gradient
                        />
                        <SkeletonLine
                            $width="18px"
                            $height="4px"
                            $top="23px"
                            $left="185px"
                            $gradient
                        />
                        <SkeletonLine
                            $width="113px"
                            $height="13px"
                            $top="50px"
                            $left="13px"
                            $gradient
                        />
                        <SkeletonLine
                            $width="58px"
                            $height="14px"
                            $top="98px"
                            $left="13px"
                            $bottom="19px"
                            $gradient
                        />
                    </SkeletonOverlay>
                )}

                {!isLoading && (
                    <>
                        <SCardGroup>
                            <CardTheme
                                $bgColor={bgColor}
                                $textColor={textColor}
                            >
                                <p>{themeLabel}</p>
                            </CardTheme>

                            <CardBtn>
                                <div />
                                <div />
                                <div />
                            </CardBtn>
                        </SCardGroup>

                        <SCardContent>
                            <SCardTitle>{title || "Без названия"}</SCardTitle>
                            <SCardDate>
                                <Calendar date={date} variant="compact" />
                            </SCardDate>
                        </SCardContent>
                    </>
                )}
            </CardWrapper>
        </Link>
    );
};

export default Card;
