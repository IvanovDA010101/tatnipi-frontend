import styles from './header.module.css';

const Header = () => {
    return (
        <div className={styles.headerContainer}>
            <img src="/header.png" alt="header" className={styles.imgContainer}/>
        </div>

    )
}

export default Header;