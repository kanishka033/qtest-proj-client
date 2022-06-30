import React, {useState} from 'react'
import styles from '../../../styles/home.module.scss'
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { Chip, Avatar } from '@mui/material';
import DrawerComp from '../../Drawer/DrawerComp';

const Menu = () => {

  const login = useSelector((state)=> state.auth.login);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
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

    {
      login ?
      (
        <div className="flex gap-x-2 ml-auto">
        <Chip sx={{ marginBottom:2, marginTop:2 }}
          avatar={
            <Avatar 
              alt={user.result.name} 
              src={user.result.imageUrl} 
              sx={{ bgcolor: '#ED6C02'}}
            > {user.result.name.charAt(0).toUpperCase()} 
            </Avatar> }
          label={ <p style={{color:"white",fontSize:'17px'}}>{user.result.givenName}</p> }
          variant="outlined" />     
          <DrawerComp />
        </div>
      ) :
      (
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
      )
    }
  </nav>
  )
}

export default Menu