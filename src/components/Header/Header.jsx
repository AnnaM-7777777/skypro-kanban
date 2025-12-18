import PopUser from "../popups/PopUser/PopUser";

export default function Header({
    onOpenNewCard,
    isPopUserOpen,
    onTogglePopUser,
    user,
}) {
    return (
        <header className="header">
            <div className="container">
                <div className="header__block">
                    {/* Логотипы */}
                    <div className="header__logo _show _light">
                        <a href="" target="_self">
                            <img src="/assets/logo.png" alt="logo" />
                        </a>
                    </div>
                    <div className="header__logo _dark">
                        <a href="" target="_self">
                            <img src="/assets/logo_dark.png" alt="logo" />
                        </a>
                    </div>

                    {/* Навигация */}
                    <nav className="header__nav">
                        <button
                            className="header__btn-main-new _hover01"
                            onClick={onOpenNewCard}
                        >
                            <p>Создать новую задачу</p>
                        </button>

                        {/* Кнопка пользователя */}
                        <div className="header__user-wrapper">
                            <button
                                className="header__user _hover02"
                                onClick={(e) => {
                                    e.stopPropagation(); // ← остановить всплытие
                                    onTogglePopUser();
                                }}
                            >
                                {user.name}
                            </button>

                            {/* Всплывающее окно внутри header__nav */}
                            {isPopUserOpen && (
                                <PopUser
                                    isOpen={isPopUserOpen}
                                    onClose={onTogglePopUser}
                                    user={user}
                                />
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
