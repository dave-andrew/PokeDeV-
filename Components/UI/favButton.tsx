import { useEffect, useState } from "react";
import styles from "./favButton.module.css"

export default function FavButton({media, pokeId}) : JSX.Element{
    let [mediaTemp, setSavedTemp] = useState(media);
    let [isLiked, setIsLiked] = useState(true);
    useEffect(() => {
        if(mediaTemp){
            let findItem = mediaTemp.findIndex(item => item === pokeId);
            setIsLiked(!(findItem === -1));
        }else{
            setIsLiked(false);
        }
        localStorage.setItem('fav_poke', JSON.stringify(mediaTemp));
    }, [mediaTemp])


    

    let handleLike = () => {
        setSavedTemp([...mediaTemp, pokeId]);
    }

    
    const handleDelete = () => {
        const newItems = mediaTemp.filter((allFavPoke) => allFavPoke !== pokeId);
        setSavedTemp(newItems);
    };

    console.log(mediaTemp)

    return (
        <div>
            {isLiked ? (<button onClick={()=>handleDelete()} className={styles.btn}><img src="/star/star.png" className={styles.img}></img></button>)
            : <button onClick={()=>handleLike()} className={styles.btn}><img src="/star/star_black.png" className={styles.img}></img></button>}
        </div>
    )


}