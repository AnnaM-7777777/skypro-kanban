import { SHeader, SHeaderBlock, LogoWrapper, Nav, CreateButton, UserButton } from "./Header.styled";

export default function Header({
    onOpenNewCard,
    onTogglePopUser,
    user,
    isDarkTheme, // ← получаем тему из App
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
                                alt="TaskManager — главная"
                            />
                        </a>
                    </LogoWrapper>

                    {/* Навигация */}
                    <Nav>
                        <CreateButton onClick={onOpenNewCard}>
                            Создать новую задачу
                        </CreateButton>

                        <div className="pop-wrap">
                            <UserButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onTogglePopUser();
                                }}
                            >
                                {user.name}
                            </UserButton>
                        </div>
                    </Nav>
                </SHeaderBlock>
            </div>
        </SHeader>
    );
}