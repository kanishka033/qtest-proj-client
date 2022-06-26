import React from 'react'
import styles from '../../../styles/home.module.scss'

const Menu = () => {
  return (
  <nav className={styles.menu}>
    <ul className={styles.firstmenu}>
      <li className={styles.menu_link}> Home </li>
      <li className={styles.menu_link}> About </li>
      <li className={styles.menu_link}> Contact us </li>
    </ul>
    <ul className={styles.secondmenu}>
      <li className={styles.menu_link}> Login </li>
      <span> or </span>
      <li className={styles.menu_link}> Signup </li>
    </ul>
  </nav>
  )
}

export default Menu