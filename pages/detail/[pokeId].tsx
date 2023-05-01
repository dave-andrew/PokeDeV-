import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_POKEMON_BY_NAME } from "../../Components/Query/PokeQuery";
import Move from "../../Components/details/move";
import { useEffect, useState } from "react";
import styles from "./[pokeId].module.css"
import FavButton from "../../Components/UI/favButton";
import Spinner from "../../Components/UI/spinner";



export default function PokeDetail() : JSX.Element {
    let router = useRouter();
    let { pokeId } = router.query;

    // console.log(pokeId)

    let [savedPoke, setSavedPoke] = useState(() => {
        if (typeof window !== 'undefined' && window.localStorage){
            let getStoredValue : (string | null);
            getStoredValue = localStorage.getItem('fav_poke');
            if(getStoredValue){
                return JSON.parse(getStoredValue);
            }
        }
        return [];
    });

    
    // let [poke, setPoke] = useState(pokeId);

    

    let {loading, error, data} = useQuery(GET_POKEMON_BY_NAME, {
        variables : {
            name: pokeId
        } 
    });

    if(loading) return (<Spinner></Spinner>)
    if(error) return <h1 className={styles.overallContainer}></h1>

    return (
        <div className={styles.overallContainer}>
            {/* <button onClick={() => router.back()}>Back</button>                       */}
            <PokeImage src={data.pokemon.sprites.front_default}></PokeImage>
            <FavButton media={savedPoke} pokeId={pokeId}></FavButton>
            <Moves>{data.pokemon.moves}</Moves>
        </div>
    )

}

export function PokeImage({...Attr}){
    return(
        <div className={styles.img}>
            <img {...Attr} alt="" style={{width: "80vw", height: "80vw"}}/>
        </div>
    )
}

export function Moves({children}){
    return (
        <div className={styles.nameContainer}>
            {children && children.map(move => <Move move={move.move.name} />)}    
        </div>
    )
}