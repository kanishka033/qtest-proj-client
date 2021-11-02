import React, { useEffect } from 'react';
import './UserForm.css';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { Alert, AlertTitle, Typography } from '@mui/material';
import { useHistory } from 'react-router';

function Closed({ docName }) {
    const history = useHistory();

    useEffect(() => {
      if (!docName) history.push('/');
    }, [])

    return (
        <div className='alert-container'>
        <div style={{marginTop:'90px'}}>
        <div className='alert-docName'>
        <Alert variant="filled" severity="info" icon={<DescriptionOutlinedIcon/>}>
           <Typography variant='h6'> {docName} </Typography>
        </Alert>
       
        <Alert severity="info" variant='outlined'  sx={{p:'25px'}}>
           <AlertTitle> This form is closed. </AlertTitle>
             You cannot send response. 
        </Alert> 
        </div> </div>
        </div> 
    )
}

export default Closed;
