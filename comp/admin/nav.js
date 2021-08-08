import Link from 'next/link'
import { useState } from "react";
import styles from "../../style/nav.module.css";
export default function Layout({children}){

    const [isOpen,setIsOpen] = useState(false);
    const [active,setactive] = useState('home');

    const openMenu= ()=> setIsOpen(!isOpen);
    return <> 
            <header className={styles.header}>
                <nav className={styles.navbar}>
                    
                <ul className={styles.navmenu}>
                    <li className={styles.navitem}>
                       <Link href='/'>
                         <a className={!active =='home'? styles.navlink: styles.navitem_active  }
                                    onClick={openMenu}>Home</a>
                        </Link>
                    </li>
                    <li className={styles.navitem}>
                        <Link href='/about'>
                          <a className={isOpen === false ? 
                                    styles.navlink : styles.navlink+' '+styles.active}
                                    onClick={openMenu}>About</a>
                        </Link>
                    </li>
                    <li className={styles.navitem}>
                        <Link href='/contact'>
                         <a className={isOpen === false ? 
                                    styles.navlink : styles.navlink+' '+styles.active}
                                    onClick={openMenu}>Contact</a>
                        </Link>
                    </li>
                </ul>
                <button className={isOpen === false ? 
                                    styles.hamburger : styles.hamburger+' '+styles.active}
                                    onClick={openMenu}
                                    >
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </button>
                </nav>
                
            </header>
   
       
     </>
}