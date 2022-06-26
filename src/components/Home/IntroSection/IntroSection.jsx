import React from 'react'
import { introdata } from '../../../constants/data'
import styles from './introSection.module.scss'

const IntroSection = () => {
  return (
  <section className={styles.section}>  
      <h2 className={styles.title}>
         Who uses Qform? 
      </h2>
    <div className={styles.container}>
      <div className={styles.innercontainer}>
      {
        introdata.map(el => 
          <div 
            key={el.key} 
            className={ el.key === "1" ? styles.leftbox : styles.rightbox }
          >
            <img src={el.image} alt="" height={65} width={70}/>
            <div className={styles.info}>
              <h5 className={styles.heading}> 
                {el.heading} 
              </h5>
              <p className={styles.description}> 
                {el.description} 
              </p>
            </div>
          </div>
        )
      }
      </div>
    </div>
  </section>
  )
}

export default IntroSection