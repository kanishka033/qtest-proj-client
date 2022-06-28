import React from 'react'
import Menu from './Menu'
import Hero from './Hero'
import styles from '../../../styles/home.module.scss'
import { useSelector } from 'react-redux';
import { svgs } from '../../../constants/icons';
import DrawerComp from '../../Drawer/DrawerComp';

const Header = () => {
  const login = useSelector((state)=> state.auth.login);

  return (
  <header className={login ? styles.small_container : styles.container}>
    <div className={styles.overlay}>
      <img src={'/images/blue_graphic_bg.jpg'} className={styles.bgimg} alt="" />     
     <div>
      <DrawerComp />
    </div>  
    <div className={styles.menubar}>     
      <div className={styles.logo}>
        <img src={svgs.logo_new} alt="" height={100} width={100}/>
      </div>    
      <Menu />
    </div>
    <Hero />
    </div>
  </header>
  )
}

export default Header