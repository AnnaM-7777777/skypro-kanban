import { useNavigate } from "react-router-dom";
import {
    SHeader,
    SHeaderBlock,
    LogoWrapper,
    Nav,
    CreateButton,
    UserButton,
} from "./Header.styled";

export default function Header({ user, isDarkTheme, onTogglePopUser }) {
    const navigate = useNavigate();

    const handleUserClick = () => {
        if (user) {
            onTogglePopUser();
        } else {
            navigate("/login");
        }
    };

    const handleCreateNewCard = () => {
        navigate("/card/new");
    };

    return (
        <SHeader>
            <div className="container">
                <SHeaderBlock>
                    <LogoWrapper $isDark={isDarkTheme}>
                        <a href="/" onClick={(e) => e.preventDefault()}>
                            <img
                                src={
                                    isDarkTheme
                                        ? "/assets/logo_dark.png"
                                        : "/assets/logo.png"
                                }
                                alt="CardManager"
                            />
                        </a>
                    </LogoWrapper>

                    <Nav>
                        <CreateButton onClick={handleCreateNewCard}>
                            Создать новую задачу
                        </CreateButton>

                        <div className="pop-wrap">
                            <UserButton onClick={handleUserClick}>
                                {user ? user.name : "Войти"}
                            </UserButton>
                        </div>
                    </Nav>
                </SHeaderBlock>
            </div>
        </SHeader>
    );
}
