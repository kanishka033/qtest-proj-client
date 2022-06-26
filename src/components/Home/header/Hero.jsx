import React from 'react'
import styles from '../../../styles/home.module.scss';
import { useHistory } from 'react-router';

const Hero = () => {
  const history = useHistory();

  const getStarted = () => {
  history.push('/auth')
  }

  return (
  <div className={styles.section}>
    <div className={styles.heroSection}>
        <h2 className={styles.herotitle}>
        Easy online form making
        </h2>
        <p className={styles.herotext}>
        Create, send and analyze your forms, 
        assessments and quizzes for free.
        </p>
        <button 
          className={styles.getstartedbtn}
          onClick={()=>getStarted()}
        >
        Get started
        </button>
    </div>
  </div>
  )
}

export default Hero