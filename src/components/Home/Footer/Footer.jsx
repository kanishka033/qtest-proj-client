import React from 'react'
import { svgs } from '../../../constants/icons'
import styles from './footer.module.scss'
import { useSelector } from 'react-redux';

const Footer = () => {
  const login = useSelector((state)=> state.auth.login);

  return (
    <footer className={styles.footer}>
    <div className="bg-black bg-opacity-10">
      <div className={styles.top_footer}>

      { !login && 
        (
          <form className={styles.form}>
          <input 
            type="text" 
            placeholder='Full Name' 
            required
            className={styles.input_field}
          />
          <input 
            type="email" 
            placeholder='Email' 
            required
            className={styles.input_field}
          />
          <textarea 
            placeholder='Type message'
            rows={4} 
            required
            className={styles.input_field} 
          />
          <button className={styles.send_btn}> 
            Send 
          </button>
        </form>
        )
      }

        <ul className={login? styles.logged_sitemap : styles.sitemap}>
          <li className={styles.link}> 
            <a href="/Home"> Home </a>
          </li>
          <li className={styles.link} >
            <a href="/about"> About </a>
          </li>
          <li className={styles.link}> 
            <a href="/new"> Create </a>
          </li>
          <li className={styles.link}> 
            <a href="/pqr"> pqr </a>
          </li>
        </ul>

        <div className={styles.logo_Links_Section}>
         <img 
          src="/svg/logo_new.svg" 
          alt="qforms" 
          height={65} 
          width={65} 
          className={login? styles.hide_logo : undefined}
        />
          <div className={styles.social_links}>
            <img src={svgs.instagram} alt="instagram" height={25} width={25} />
            <img src={svgs.github} alt="github" height={25} width={25} />
            <img src={svgs.email} alt="email" height={25} width={25} />
          </div>
        </div>

      </div>
      <div className={styles.bottom_footer}>
        <img src={"/svg/copyright.svg"} alt="" height={14} width={14}/>
        <p> 2021 Qforms. All rights reserved </p>
      </div>
    </div>
    </footer>
  )
}

export default Footer