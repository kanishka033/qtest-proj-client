import React from 'react'
import styles from './reviewSection.module.scss';

const CustomerCards = ({ el }) => {
  return (
  <>  
      <div key={el.key} className={styles.customerCards}>
        <img 
          src={el.image} 
          alt="" 
          className={styles.card_image}
        />
        <p className='max-w-xl text-text'>
          {el.description}
        </p>
        <div className={styles.line}/> 
        <h6 className={styles.customerName}> {el.heading} </h6>
        <p className={styles.customerTitle}> {el.info} </p>
      </div>   
  </>
  )
}

export default CustomerCards