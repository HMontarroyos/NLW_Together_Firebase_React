import React, { useState, useEffect } from 'react'
import DarkModeToggle from "react-dark-mode-toggle";
//import { useTheme } from "../Hooks/useTheme"


export function DarkModeToggleComponent (){

    const [themeState, setThemeState] = useState(false);
    /* const {theme, toggleTheme} = useTheme();
 */
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleChange = () => {
      setThemeState(!themeState)
        setIsDarkMode(!isDarkMode);
      if (themeState) {
        sessionStorage.setItem('Theme', 'dark');
        
        document.body.classList.add('dark-mode');
      } else {
        sessionStorage.setItem('Theme', 'light');
        document.body.classList.remove('dark-mode');
      }
    }
    useEffect(() => {
      const getTheme = sessionStorage.getItem('Theme');
      if (getTheme === 'dark') return  document.body.classList.add('dark-mode');
    })
    return (
        <DarkModeToggle
        //onChange={props.onChange}
            onChange={handleChange}
            checked={isDarkMode}
            size={80}
            //onClick={props.onClick}
            //onClick={toggleTheme}
        />

      /*   <button onClick={handleChange}></button> */

    )
}




    





