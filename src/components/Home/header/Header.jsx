import React from 'react'
import Menu from './Menu'
import Hero from './Hero'
import styles from '../../../styles/home.module.scss'

const Header = () => {
  return (
  <header className={styles.container}>
    <div className={styles.overlay}>
      <img src={'/images/blue_graphic_bg.jpg'} className={styles.bgimg} alt="" />     
      <img 
        src={'/svg/hamburger.svg'} 
        height={35}
        width={35}
        alt="menu" 
        className={styles.burger}
      />        
    <div className={styles.menubar}>     
      <div className={styles.logo}>
        <img src={'/svg/logo_new.svg'} alt="" height={100} width={100}/>
      </div>    
      <Menu />
    </div>
    <Hero />
    </div>
  </header>
  )
}

export default Header