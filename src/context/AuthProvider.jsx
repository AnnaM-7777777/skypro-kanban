import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { SignIn, SignUp } from "../services/auth";

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(
        localStorage.getItem("isAuth") === "true",
    );

    const [user, setUser] = useState(
        localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : null,
    );

    useEffect(() => {
        localStorage.setItem("isAuth", isAuth);
    }, [isAuth]);

    const login = async ({ login, password }) => {
        const userData = await SignIn({ login, password });

        const user = {
            login: userData.login,
            name: userData.name,
        };

        localStorage.setItem("token", userData.token);
        localStorage.setItem("user", JSON.stringify(user));

        setUser(user);
        setIsAuth(true);
    };

    const register = async ({ login, password, name }) => {
        const userData = await SignUp({ login, password, name });

        const user = {
            login: userData.login,
            name: userData.name,
        };

        localStorage.setItem("token", userData.token);
        localStorage.setItem("user", JSON.stringify(user));

        setUser(user);
        setIsAuth(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isAuth");

        setUser(null);
        setIsAuth(false);
    };

    return (
        <AuthContext.Provider value={{ isAuth, user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
