import { ThemeContext } from "../context/ThemeContext";
import styles from "./CardContainer.module.css"
import { useContext } from "react"

export function CardContainer({media}:any){

    let theme = useContext(ThemeContext);

    return (
        <div className={styles.card}>
            <div className={styles.wrapper}>
                <Image src={media.image}></Image>
            </div>
            
            <Name>{media.name.charAt(0).toUpperCase() + media.name.slice(1)}</Name>

            <ImageChar src={media.image}></ImageChar>
            
        </div>
    )
}

export function Image({...Attr}){
    return (
        <img {...Attr} alt="" className={styles.cover_image}/>
    )
}

export function Name({children}:any){
    let theme = useContext(ThemeContext);
    return (
        <div className={styles.title} style={{color: theme.color}}>{children}</div>
    )
}

export function ImageChar({...Attr}){
    return (
        <img {...Attr} alt="" className={styles.character}/>
    )
}