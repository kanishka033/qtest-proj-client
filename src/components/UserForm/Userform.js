import React, { useEffect, useState } from 'react';
import SignUp from '../Auth/SignUp';
import { useParams, useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getQuest, addResponse, emailResponse, oneTimeResponse } from '../../actions/response';
import { Paper, Typography, TextField, makeStyles, Divider, CircularProgress, DialogActions } from '@material-ui/core';
import { Button, FormControlLabel, Checkbox } from '@mui/material';
import { Alert, Link, Dialog, DialogContentText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './UserForm.css';
import { MODAL } from '../../actions';
import Closed from './Closed';

const useStyles = makeStyles((theme) => ({
   pointer: {
      "&:hover": {
      cursor : 'pointer'
      }
   }
}));

function UserForm() {

const { url } = useParams();
const history = useHistory();
const dispatch = useDispatch();
const classes = useStyles();

const questions = useSelector(state => state.questions);
const user = useSelector(state => state.auth.authData);
const dialogOpen = useSelector(state => state.auth.modal); 

const [open, setOpen] = useState();
const [email_required, setEmail_required] = useState();
const [res_limit, setRes_limit] = useState();

const [docName, setDocName] = useState('Untitled');
const [docDesc, setDocDesc] = useState('');

const [quest, setQuest] = useState();
const [answer, setAnswer] = useState([]);
const [email, setEmail] = useState('');

useEffect(() => {
   dispatch(getQuest(url))
}, [dispatch,url])

useEffect(()=> { 
   if(questions) {
     setQuest(questions.questions);
     setDocName(questions.documentName);
     setDocDesc(questions.documentDescription);
     setOpen(questions.open);
     setEmail_required(questions.email_required);
     setRes_limit(questions.res_limit);
   }
   if (user) setEmail(user.result.email);
 },[questions, user])

 // open signin modal if required
 useEffect(() => {
   if ((email_required || res_limit) && !email) {
      dispatch({ type: MODAL, payload: true })
   }
 }, [email_required, res_limit, email])

 // answer sheet 
 if (quest && answer.length < quest.length) {
   quest.map((q)=> {
       answer.push({
       "questionText": q.questionText,
       "questionType": q.questionType,
       "answer" : ''
       })
   })
}

// a create controller tat checks if email already exists in res_limit 
function submit() {
// dispatch action submit that sets question to [] 
let answerSet = { user_email: email, answer: answer }

   if (email_required && !res_limit) {
      dispatch(emailResponse(url, answerSet)); 
   } else if (res_limit && !email_required) {
      dispatch(oneTimeResponse(url, { user_email:'', answer: answer }));
   } else if(email_required && res_limit){
      dispatch(oneTimeResponse(url, answerSet));
   } else {
      dispatch(addResponse(url,answerSet));
   }
   history.push(`/${url}/submit`);
}

function select(qindex,value){
   answer[qindex].answer = value;
   setAnswer(answer)
}

function selectinput(qindex,option){
   answer[qindex].answer = option;
   setAnswer(answer)
}

function selectcheck(qindex){
let values = [].filter.call(document.getElementsByName(qindex),(c) => c.checked).map(c => c.value);
 answer[qindex].answer = values;
 setAnswer(answer)
}

let questSets;
if(quest) {
   questSets = quest.map((q, qindex) => {
      return ( 
         <div 
            key={qindex} 
            style={{padding:"15px",margin:"12px 0px",paddingBottom:'25px',paddingRight:"65px"}}
            className="border border-bar rounded-sm shadow"
         >
            <Typography style={{padding:"8px"}}> {qindex + 1}. {q.questionText} </Typography> 

         { q.options.map((opt,index)=>(
            <div key={index} style={{padding:'6px'}}>
            {
            q.questionType === 'radio'? (   
                 
            <label className={classes.pointer}>
               <input className={classes.pointer}
                  type={q.questionType}
                  value= {opt.optionText}
                  name={qindex} 
                  onChange={()=>{select(qindex,opt.optionText)}}
                  style={{marginRight:"15px",height:"22px",width:"20px",verticalAlign:'middle'}} />                                                                         
                 <span style={{marginLeft:"-9px"}}> {opt.optionText} </span>
            </label> 
               
               ) :
                q.questionType === 'text'? (
               <TextField variant="standard"
                  fullWidth
                  multiline
                  name={qindex}
                  className="form-check-input"
                  placeholder= {opt.optionText}
                  style={{marginLeft:"10px"}}
                  onChange={(e)=>{selectinput(qindex,e.target.value)}} />                  
               ) : 
               (
                  <FormControlLabel control={<Checkbox/>} name={qindex}
                  value= {opt.optionText}
                  style={{marginRight:"5px",margin:"-10px",padding:'3px'}}
                  onChange={()=>{selectcheck(qindex)}}label={opt.optionText} />
                 )  
            }
         </div>
         )
         )} </div>
         
        )
   });
}

return (
   <div>
{ quest ?
   <div style={{display:"flex",justifyContent:"center"}}> 
   { open ? 
   <div  style={{width:"650px",margin:'0px 8px'}}> 
      
      <Paper variant='outlined' > 

      <div style={{padding:'12px 22px'}} className="top-section">
         <Typography variant='h5' style={{fontWeight:"500"}}> {docName}</Typography>
         <p className="text-white font-light mt-1 text-sm"> {docDesc}  </p>
      </div>

      { email_required ?  <>
         <Divider />
         <p style={{fontSize:'15px',padding:'10px 0px 5px 25px'}}>email <span style={{color:'red'}}>*</span></p>
      <div className='email-container' style={{padding:'0px 25px 20px 25px',display:'flex'}}>
         <div> <TextField   
               style={{width:'270px',marginTop:'-5px',marginRight:'10px'}}   
               value={email}
               disabled
               /> 
         </div>
         <div className='switch-account'>
         <Link component='button' underline="none" style={{fontSize:'14px'}} 
          onClick={()=>dispatch({ type: MODAL, payload: true })}>
            switch account
         </Link> </div>
      </div> </> 
      : null }

      </Paper>
        { questSets }
      { quest && <Button variant='contained' onClick={submit} className='submit' sx={{mb:5, mx:3}}> Submit </Button> } 
      
      <Dialog open={dialogOpen}> 
        { !email ? 
            <DialogContentText sx={{p:1.5,ml:1.5}}> 
               Requires Signin <span style={{color:'red'}}> *</span> 
            </DialogContentText> 
         :  <DialogActions> 
               <IconButton size='small' onClick={()=>dispatch({ type: MODAL, payload: false })}>
                  <CloseIcon />
               </IconButton> 
            </DialogActions>
         }
         <SignUp dialogOpen={dialogOpen} />
      </Dialog>
   </div> 
   : <Closed docName={docName}/>
   }
   </div> 

   :<Paper  style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}> 
      { questions ?  
         <CircularProgress /> 
      :  <Alert severity="warning" variant='outlined' sx={{mb:15,p:2}}> URL doesn't exist ! </Alert> 
      }
   </Paper>
   }
   </div>
 )
}

export default UserForm;
