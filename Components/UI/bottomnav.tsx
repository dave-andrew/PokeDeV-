import Link from "next/link"
import styles from "./bottomnav.module.css"

export default function BottomNav(){

    return (
        <div className={styles.bottomnav}>
            <div className={styles.content}>
                <Link href={`/`}><img src="/bottom_nav_icon/home.png" alt="" className={styles.icon} /></Link>
                <Link href={`/favorite`}><img src="/bottom_nav_icon/favorite.png" alt="" className={styles.icon} /></Link>
                <Link href={`/search`}><img src="/bottom_nav_icon/search.png" alt="" className={styles.icon} /></Link>
            </div>
        </div>
    )

}