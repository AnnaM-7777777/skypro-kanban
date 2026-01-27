import React from "react";
import {
    SHeader,
    SHeaderBlock,
    LogoWrapper,
    Nav,
    CreateButton,
    UserButton,
} from "./Header.styled.js";

export default function Header({
    onOpenNewCard,
    onTogglePopUser,
    user,
    isDarkTheme,
}) {
    return (
        <SHeader>
            <div className="container">
                <SHeaderBlock>
                    {/* Логотип */}
                    <LogoWrapper $isDark={isDarkTheme}>
                        <a href="/">
                            <img
                                src={
                                    isDarkTheme
                                        ? "/assets/logo_dark.png"
                                        : "/assets/logo.png"
                                }
                                alt="TaskManager"
                            />
                        </a>
                    </LogoWrapper>

                    {/* Навигация */}
                    <Nav>
                        <CreateButton onClick={onOpenNewCard}>
                            Создать новую задачу
                        </CreateButton>

                        <div className="pop-wrap">
                            <UserButton onClick={onTogglePopUser}>
                                {user ? user.name : "Войти"}
                            </UserButton>
                        </div>
                    </Nav>
                </SHeaderBlock>
            </div>
        </SHeader>
    );
}
