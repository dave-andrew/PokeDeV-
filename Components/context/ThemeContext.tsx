import { createContext } from "react"


export const THEME = {
    dark: {
        backgroundColor: "#161616",
        color: "white",
        shadow: "white"
    },
    light: {
        backgroundColor: "#ADD8E6",
        color: "black",
        shadow: "black"
    }
}

export const ThemeContext = createContext(THEME.light);