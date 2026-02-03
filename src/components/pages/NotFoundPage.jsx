import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NotFoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
    background-color: #f1f1f1;
`;

const NotFoundCard = styled.div`
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    padding: 2.5rem;
    text-align: center;
    max-width: 400px;
    width: 100%;
`;

const NotFoundTitle = styled.h1`
    font-size: 24px;
    font-weight: 700;
    color: #000;
    margin-bottom: 1rem;
`;

const NotFoundText = styled.p`
    font-size: 16px;
    color: #94a6be;
    margin-bottom: 2rem;
    line-height: 1.5;
`;

const HomeButton = styled.button`
    width: 100%;
    padding: 0.75rem;
    background: #565eef;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: background 0.2s;

    &:hover {
        background: #4338ca;
    }
`;

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <NotFoundContainer>
            <NotFoundCard>
                <NotFoundTitle>404</NotFoundTitle>
                <NotFoundText>Страница не найдена</NotFoundText>
                <HomeButton onClick={() => navigate("/")}>
                    Вернуться на главную
                </HomeButton>
            </NotFoundCard>
        </NotFoundContainer>
    );
}
