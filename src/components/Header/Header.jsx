import { useState } from "react";
import PopUser from "../popups/PopUser/PopUser";
import {
    SHeader,
    SHeaderBlock,
    LogoWrapper,
    Nav,
    CreateButton,
    UserWrapper,
    UserButton,
} from "./Header.styled";

export default function Header({
    onOpenNewCard,
    isPopUserOpen,
    onTogglePopUser,
    user,
}) {
    // Можно управлять темой через состояние, если нужно
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    return (
        <SHeader>
            <div className="container">
                <SHeaderBlock>
                    {/* Логотипы */}
                    <LogoWrapper $isDark={isDarkTheme}>
                        <a href="/">
                            <img src={
                                isDarkTheme ? "/assets/logo_dark.png" : "/assets/logo.png"
                                }
                                alt="TaskManager — главная"
                            />
                        </a>
                    </LogoWrapper>

                    {/* Навигация */}
                    <Nav>
                        <CreateButton onClick={onOpenNewCard}>
                            Создать новую задачу
                        </CreateButton>

                        <UserWrapper>
                            <UserButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onTogglePopUser();
                                }}
                            >
                                {user.name}
                            </UserButton>

                            {isPopUserOpen && (
                                <PopUser
                                    isOpen={isPopUserOpen}
                                    onClose={onTogglePopUser}
                                    user={user}
                                    onThemeToggle={() =>
                                        setIsDarkTheme(!isDarkTheme)
                                    }
                                />
                            )}
                        </UserWrapper>
                    </Nav>
                </SHeaderBlock>
            </div>
        </SHeader>
    );
}
