import React from 'react'
import styles from '../../../styles/home.module.scss'
import { useHistory } from 'react-router';

const Menu = () => {
  const history = useHistory();

  const onContactUs = () => {
    history.push('/')
  }

  return (
  <nav className={styles.menu}>
    <ul className={styles.firstmenu}>
      <li 
        className={styles.menu_link} 
        onClick={()=>history.push('/')}
      > Home </li>
      <li 
        className={styles.menu_link} 
        onClick={()=>history.push('/about')}
      > About </li>
      <li 
        className={styles.menu_link} 
        onClick={()=> onContactUs()}
      > Contact us </li>
    </ul>

    <ul className={styles.secondmenu}>
      <li 
        className={styles.menu_link}
        onClick={()=>history.push('/auth')}
      > Login </li>
      <span> or </span>
      <li 
        className={styles.menu_link}
        onClick={()=>history.push('/signup')}
      > Signup </li>
    </ul>
  </nav>
  )
}

export default Menu