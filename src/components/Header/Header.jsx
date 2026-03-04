import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import PopUser from "../popups/popExitConfirm.jsx";

import {
    SHeader,
    SHeaderBlock,
    LogoWrapper,
    Nav,
    CreateButton,
    UserName,
} from "./Header.styled.js";

function Header({ isDark, toggleTheme }) {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isExitOpen, setIsExitOpen] = useState(false);

    const popupRef = useRef(null);

    const handleToggle = () => setIsOpen((prev) => !prev);

    return (
        <SHeader>
            <SHeaderBlock>
                <LogoWrapper>
                    <Link to="/">
                        <img
                            src={
                                isDark
                                    ? "/assets/logo_dark.png"
                                    : "/assets/logo.png"
                            }
                            alt="logo"
                        />
                    </Link>
                </LogoWrapper>

                <Nav>
                    <CreateButton>
                        <Link to="/add-task">Создать новую задачу</Link>
                    </CreateButton>

                    <UserName
                        id="userNameButton"
                        type="button"
                        onClick={handleToggle}
                    >
                        {user?.name || "Пользователь"}
                    </UserName>

                    {isOpen && (
                        <div
                            ref={popupRef}
                            className={`pop-user__menu ${isDark ? "dark-mode" : ""}`}
                        >
                            <p className="pop-user__name">
                                {user?.name || "Пользователь"}
                            </p>

                            <p className="pop-user__login">
                                {user?.login || "Пользователь"}
                            </p>

                            <div className="pop-user__theme">
                                <p>Темная тема</p>
                                <input
                                    type="checkbox"
                                    checked={isDark}
                                    onChange={toggleTheme}
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setIsExitOpen(true);
                                    setIsOpen(false);
                                }}
                            >
                                Выйти
                            </button>
                        </div>
                    )}

                    {isExitOpen && (
                        <PopUser
                            onClose={() => setIsExitOpen(false)}
                            isDarkTheme={isDark}
                        />
                    )}
                </Nav>
            </SHeaderBlock>
        </SHeader>
    );
}

export default Header;
