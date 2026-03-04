import { useNavigate } from "react-router-dom";
import {
  NotFoundWrapper,
  NotFoundTitle,
  NotFoundText,
  BackButton,
} from "./NotFoundPage.styled";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <NotFoundWrapper>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundText>Страница не найдена</NotFoundText>
      <BackButton onClick={() => navigate("/")}>
        Вернуться на главную
      </BackButton>
    </NotFoundWrapper>
  );
}

export default NotFoundPage;
