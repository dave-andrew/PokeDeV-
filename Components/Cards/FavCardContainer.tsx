import { ThemeContext } from "../context/ThemeContext"
import { useContext } from "react"


export default function FavCardContainer({media}){

    return (
        <div>
            <Image src={media.pokemon.sprites.front_default}></Image>
            <Name>{media.pokemon.name}</Name>
        </div>
    )

}

export function Image({...Attr}){
    return (
        <div style={{
            display: "flex",
            justifyContent: "center"
        }}>
            <img {...Attr} alt=""/>
        </div>
        
    )
}

export function Name({children}){
    let theme = useContext(ThemeContext);
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            color: theme.color
        }}>{children}</div>
    )
}