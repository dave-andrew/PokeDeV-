import { useLazyQuery, useQuery } from "@apollo/client";
import Home from ".";
import { useEffect, useState } from "react"
import { GET_POKEMON_BY_NAME } from "../Components/Query/PokeQuery";
import SearchedCard from "../Components/Cards/SearchedCard";
import styles from "./search.module.css"


export default function Search(){
    
    let [searchPoke, setSearchPoke] = useState();
    
    let inputChange = (e:any) => {
        e.preventDefault();
        setSearchPoke(e.target.value.toLowerCase());
    }

    const [getPokemonByName, { loading, error, data }] = useLazyQuery(GET_POKEMON_BY_NAME);

    useEffect(() => {
        if (searchPoke !== '') {
            getPokemonByName({
                variables:{
                    name: searchPoke
                }
            })
        }
    }, [searchPoke, getPokemonByName]); 

    return (
        <div className={styles.search_container}>
            <input type="text" onInput={inputChange} value={searchPoke} className={styles.input} placeholder="Search Pokemon" />
            {!searchPoke ? <Home></Home> : ( error || !data ? <div style={{marginTop: "10rem"}}>Poke Not Found</div> : <SearchedCard media={data}></SearchedCard> )}
        </div>
    )

}