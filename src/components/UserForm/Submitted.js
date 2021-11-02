import React,{ useEffect } from 'react';
import { CardHeader, Alert, Card } from '@mui/material';
import { getQuest } from '../../actions/response';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Closed from './Closed';

// are conditions related to one-time response (you had already submitted)
function Submitted() {

const { url } = useParams();
const dispatch = useDispatch();

const questions = useSelector(state => state.questions);

useEffect(() => {
    dispatch(getQuest(url))
}, [dispatch, url])

return (
    <div style={{display:'flex',justifyContent:'center',backgroundColor:'white',height:'100vh'}}>
    { questions.open ?
        <Card variant='outlined' sx={{ maxWidth:300,maxHeight:120,mt:10 }}>
            <Alert severity="success">Done!</Alert>
            <CardHeader subheader='Your response has been submitted.'/> 
        </Card>
        : 
        <Closed docName={questions.documentName}/>
    }
    </div>
    )
}

export default Submitted;
