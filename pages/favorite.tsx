import { Component, useEffect, useState } from "react";
import { CardContainer } from "../Components/Cards/CardContainer";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_BY_NAME } from "../Components/Query/PokeQuery";
import FavCardContainer from "../Components/Cards/FavCardContainer";
import { domainToASCII, fileURLToPath } from "url";
import styles from "./favorite.module.css"
import style from "./index.module.css"
import Link from "next/link";
import { useRouter } from "next/router";
import Spinner from "../Components/UI/spinner";
import Skeleton from "react-loading-skeleton";
import { ThemeContext } from "../Components/context/ThemeContext";
import { useContext } from "react"

export default function Favorite() : JSX.Element{


    
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

    let [sort, setSort] = useState(true)

    let desiredSort = (sort) ? savedPoke.sort() : savedPoke.sort().reverse();

    let pokeQuery = desiredSort.map((name) => ({
        query: GET_POKEMON_BY_NAME,
        variables: {
            name: name
        }
    }))

    const results = pokeQuery.map((query) => useQuery(query.query,
        {
            variables: query.variables 
        }
    ));

    const [searchFav, setSearchFav] = useState('')

    let handleChange = (e) => {
        setSearchFav(e.target.value);
    }

    const filterResult = results.filter(({ data }) =>
        data && data.pokemon.name.includes(searchFav.toLowerCase())
    );

    let display = (!searchFav) ? results : filterResult; 

    let theme = useContext(ThemeContext);

    return (
        <div className={styles.fav_container}>
            
            <div>
                <input type="text" value={searchFav} placeholder="Search Favorite Pokemon" onInput={handleChange} className={styles.input} style={{border: theme.color}}></input>
                <button onClick={() => setSort(prev => !prev)} className={styles.sort_button}>
                    {sort ? <img src="/sort_black/sort-descending.png" alt="" className={styles.toggle_sort}/> : <img src="/sort_black/sort-ascending.png" alt="" className={styles.toggle_sort} />}
                </button>
            </div>

            <div className={style.grid}>

                {
                    display.map(({loading, error, data}, index) => {
                        if(loading) return (
                                <div>
                                    <Spinner />
                                </div>
                            )
                        if(error) return <h5>{error.message}</h5>

                        return (
                            <div key={data.pokemon.name}>
                                
                                <Link href={`/detail/${data.pokemon.name}`}>
                                    <FavCardContainer media={data}></FavCardContainer>
                                </Link>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}