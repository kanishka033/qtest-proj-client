import React from 'react'
import styles from '../../../styles/home.module.scss';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import PostAddIcon from '@material-ui/icons/PostAdd';
import CodeInputBtn from '../../FormCodeComp/CodeInputBtn';

const Hero = () => {
 
  const login = useSelector((state)=> state.auth.login);
  const history = useHistory();

  return (
    <div className={login ? styles.logged_heroSection : styles.heroSection}>
        <div className='space-y-6'>
          <h2 className={styles.herotitle}>
          Easy online form making
          </h2>
          <p className={styles.herotext}>
          Create, send and analyze your forms, <br className='hidden md:block'/>
          assessments and quizzes for free.
          </p>
        </div>
        
        <div className={!login ? styles.btns_wrapper: 'hidden'}>
          <button 
            className={login? styles.hidden_btn : styles.getstartedbtn}
            onClick={()=> history.push('/auth')}
          >
          Get started
          </button>
          { !login && <CodeInputBtn /> }
        </div>

        <button 
          className={ login? styles.add_btn : 'hidden' }
          onClick={()=> history.push('/new')}
        >
          <PostAddIcon className={styles.add} fontSize="large"/> 
          <p className={styles.create}> create </p>
        </button>
    </div>
  )
}

export default Hero