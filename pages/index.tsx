import { ApolloClient, ApolloProvider, useQuery } from "@apollo/client";
import { GET_POKEMON } from "../Components/Query/PokeQuery";
import { CardContainer } from "../Components/Cards/CardContainer";
import Link from "next/link";
import { useEffect } from "react";
// import styles from "./index.module.css"
import Spinner from "../Components/UI/spinner";
import styles from "./index.module.css"
import { useContext } from 'react'
import { ThemeContext } from "../Components/context/ThemeContext";


export default function Home() : JSX.Element {
    
    let theme = useContext(ThemeContext);

    useEffect(() => {
        if(!localStorage.getItem('fav_poke')){
            localStorage.setItem('fav_poke', "");
        }
    })

    let {loading, error, data} = useQuery(GET_POKEMON, {
        variables : {
            limit: 1000,
            offSet: 0
        },
    });

    if(loading) return <Spinner></Spinner>

    console.log(data);
    return (
        <div className={styles.grid} style={{color: theme.color}}>
            {
                data.pokemons.results.map((media:any, index:any) => {
                    return (
                        <div key={media.name}>
                            <Link href={`/detail/${media.name}`} className={styles.link}>
                                <CardContainer media={media}></CardContainer>
                            </Link>
                        </div>
                    )
                    
                })
            }
            
        </div>
    )
}

