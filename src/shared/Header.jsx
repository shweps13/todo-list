import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import styles from '../css/Header.module.css'
import { MdDoneAll } from "react-icons/md";


function Header() {
    const location = useLocation();
    const [title, setTitle] = useState("ToDo List");

    useEffect(() => {
        if (location.pathname === "/") {
            setTitle("ToDo List");
        } else if (location.pathname === "/about") {
            setTitle("About");
        } else {
            setTitle("Not Found");
        }
    }, [location]);

    return (
        <div className={styles.headerContainer}>
            <h1><MdDoneAll />FocusFlow</h1>
            <h4>{title}</h4>
            <nav>
                <NavLink to={"/"} className={({isActive}) => isActive ? styles.active : styles.inactive}>Home</NavLink>
                <NavLink to={"/about"} className={({isActive}) => isActive ? styles.active : styles.inactive}>About</NavLink>
            </nav>
        </div>
    )
}

export default Header;