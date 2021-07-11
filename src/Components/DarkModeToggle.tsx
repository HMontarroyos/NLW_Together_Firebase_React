import React, { useState, useEffect } from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import "../Styles/DarkModeToggle.scss";



export function DarkModeToggleComponent () {
    const [themeState, setThemeState] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleChange = () => {
        setThemeState(!themeState);
        if (themeState) {
            setIsDarkMode(false);
            sessionStorage.setItem("Theme", "light");
            document.body.classList.remove("dark-mode");
            document.body.classList.add("light-mode");
            
        } else {
            setIsDarkMode(true); 
            sessionStorage.setItem("Theme", "dark");
            document.body.classList.add("dark-mode");
            document.body.classList.remove("light-mode"); 
            
        }
    };
    useEffect(() => {
        const getTheme = sessionStorage.getItem("Theme");
        if (getTheme === "dark") {
            return document.body.classList.add("dark-mode");
        } else {
            return document.body.classList.add("light-mode");
        }
    });
    return (
        <DarkModeToggle
            checked={isDarkMode}
            onChange={handleChange}
            size={80}
            className={"DarkModeToggle"}
        />
    );
}
