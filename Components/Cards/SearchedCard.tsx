import Link from "next/link"
import styles from "./SearchedCard.module.css"

export default function SearchedCard({media}:any) : JSX.Element{

    // console.log(media)

    return (
        <div className={styles.searced}>
            {media.pokemon.sprites ? 
                <Link href={`./detail/${media.pokemon.name}`}>
                    <Image src={media.pokemon.sprites.front_default}></Image>
                    <Name>{media.pokemon.name}</Name>
                </Link>
                : 
                <p>Poke Not Found</p>
            }
            
        </div>
    )

}

export function Image({...Attr}){
    return (
        <div style={{marginTop: "10rem"}}>
            <img {...Attr} />
        </div>
    )
}

export function Name({children}:any){
    return (
        <div className={styles.name}>
            {children}
        </div>
    )
}