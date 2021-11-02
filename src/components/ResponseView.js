import React,{ useState, useEffect } from 'react';
import moment from 'moment';
import { Typography, Paper, FormControlLabel, Radio, Checkbox } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getQuestion } from '../actions/questions';
import { CircularProgress } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Divider } from '@material-ui/core';

function ResponseView(props) {
    const dispatch = useDispatch();
    const query = new URLSearchParams(props.location.search);

    const id = query.get('_id');
    const res = query.get('_res');
    //console.log(res);
    //console.log(id); 

    const question = useSelector((state)=> id ? state.documents.find((p)=> p._id == id): null);
    const auth = useSelector(state => state.auth);

    let response;
    if (question) response = question.responses[res];

    let email = auth.authData?.result?.email;
  
    useEffect(()=>{
      if (email) dispatch(getQuestion(email));
    },[dispatch, auth])
    
    return (
    <div style={{width:"100%", display:'flex',justifyContent:'center',minHeight:"500px"}}>
    { question? 
    <div style={{width:"700px",margin:'0px 7px'}}>

        <Paper variant='outlined' style={{marginBottom:"15px",padding:'15px',minHeight:'100px'}}> 
            <Typography variant='h6'> AnswerSheet </Typography>
            <Divider style={{margin:'8px 0px'}} />
            <Typography variant='subtitle1'><span style={{fontSize:'14px'}}>email: &nbsp;</span> { response.user_email? response.user_email: 'unknown' } </Typography>
            <Typography variant='overline' style={{float:'right'}}> { moment(question.responses[res].date).format('lll') } </Typography>
        </Paper>
      
        { question.responses[res].answer.map((el,idx)=> ( 
            <Paper variant='outlined' key={idx} style={{marginBottom:"15px",padding:'20px'}}>
                <Typography variant='body1' style={{marginBottom:'5px'}}> {idx+1}. {el.questionText} </Typography>
                
            { question.questions[idx].options.map((opt,optidx)=> 
             el.questionType == 'radio' ?
                <div style={{ paddingLeft:'2px'}}>
                    <FormControlLabel
                        label={<Typography variant='body2'> {opt.optionText}</Typography>}
                        control={<Radio checked={el.answer === opt.optionText}
                            value={opt.optionText}
                            name={`radio-buttons-${idx}`}
                            inputProps={{ 'aria-label': opt.optionText }}
                            style={{ margin:'-3px'}} />} 
                    /> </div>
              : el.questionType == 'checkbox' ?
                    <div>
                    <FormControlLabel
                        label={<Typography variant='body2'> {opt.optionText}</Typography>}
                        control={<Checkbox checked={el.answer.includes(opt.optionText)}/>}
                    />
                    </div>
                
              : <div style={{marginRight:'20px',marginTop:'15px',marginBottom:'5px'}}>
              <TextField 
                    
                    size='small'
                    fullWidth 
                    multiline 
                    variant="outlined" 
                    value={el.answer} 
                    InputProps={{readOnly: true}}
                /> </div>
            ) }
            </Paper>
            ) )} 
        </div> 
        : <div style={{display:"flex",justifyContent:'center',alignItems:'center',height:'500px'}}>
            <CircularProgress />
          </div>
    }
        </div>
    )
}

export default ResponseView;
