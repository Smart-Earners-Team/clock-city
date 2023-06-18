import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

export const ThemeSwitch: React.FC = () => {
    const { isDark, setIsDark } = useContext(ThemeContext);

    return (
        <div className={`${isDark ? "bg-dark" : "bg-light"} m-1 text-xl`}>
            <button onClick={() => setIsDark(!isDark)}>
                {!isDark ? <FiSun /> : <FiMoon />}
                {/* Toggle theme */}
            </button>
        </div>
    );
};
