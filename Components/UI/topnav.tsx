import { useRouter } from "next/router"
import styles from "./topnav.module.css"

export default function TopNav(){
    
    let router = useRouter();

    return (
        <div className={styles.topnav_container}>
            {router.pathname !== '/' && (
                <button onClick={() => router.back()} className={styles.btn}><img src="/left-arrow.png" alt=""/></button>
            )}
            <img src="/Title.png" alt="" className={styles.img} />
        </div>
    )

}
