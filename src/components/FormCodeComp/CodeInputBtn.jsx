import React, { useState } from 'react'
import styles from './codeinputbtn.module.scss'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

const CodeInputBtn = ({ drawer }) => {
    const history = useHistory()
    const login = useSelector((state)=> state.auth.login);

    const [code, setcode] = useState("")

    const submitCode = () => {
        if (code.trim()) history.push(`/response/${code}`)
    }   

  return (
    <div className='flex'>
        <input 
            type="text" 
            placeholder="code here" 
            value={code} 
            onChange={(e)=>setcode(e.target.value)}
            className={ login || drawer ? styles.drawer_inputfield : styles.inputfield}
        />
        <button className={styles.codebtn} onClick={()=>submitCode()}> 
          <ArrowForwardOutlinedIcon style={{color:"white"}} />
        </button>
    </div>
  )
}

export default CodeInputBtn