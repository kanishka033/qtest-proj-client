import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CLEAR_SAMPLE } from '../actions';
import { CreateQuestion } from '../actions/questions';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Paper, Typography, Radio, IconButton, Tooltip, Button, AppBar, Box, Toolbar, Divider } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

function SampleQuestions() {
const history = useHistory();
const dispatch = useDispatch();

const sample = useSelector(state => state.sample);
const email = useSelector(state => state.auth.authData?.result.email);

const [questions, setQuestions] = useState([]);
const [Loaded, setLoaded] = useState(false);
const [showcheck, setShowcheck] = useState(false);
const [documentName, setDocumentName] = useState('Sample')

const unescapeHtml=(question) => {
    return question.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'"); 
  }

const multipleChoice = (arr, item) => {
    let newArr = [...arr]
    // random index then insert answer in random place
    const index = Math.floor(Math.random()*(newArr.length+1))   
    newArr.splice(index,0,item)
   return newArr.map(i=> ({ optionText: unescapeHtml(i) }) )
} 

const handleBack =() => {
  history.push('/sample')
  dispatch({ type: CLEAR_SAMPLE })
}

const handleSave =() => {
  let questionSet = { documentName, questions };
  let url = uuidv4();
  dispatch(CreateQuestion({...questionSet, email, url, open:true, email_required:false, res_limit:false }));
  history.push('/');
}

// when push back set sample to null actiontype -> reducer
// save action same as create question (check for all validation and add to question schema)
useEffect(()=>{
    if (sample && questions.length < sample.length) {
        sample.map((q)=> {
          questions.push({
            questionText: unescapeHtml(q.question),  
            options: multipleChoice(q.incorrect_answers, q.correct_answer),
            correct_answer : unescapeHtml(q.correct_answer),
            category: q.category,
            difficulty: q.difficulty,
            questionType: 'radio',
            open: 'false'
            })
        })
        setLoaded(true);
    }
},[sample])

return (
<>

      
      <AppBar elevation={0} position='sticky' sx={{bgcolor:'white'}}> 
      <Toolbar sx={{bgcolor:'white'}} position='sticky' >
           
      <Button variant='outlined' 
        color='inherit' 
        sx={{color:'#757575',textTransform: 'none',mr:'auto'}} 
        onClick={handleBack} 
        startIcon={<ArrowBackIcon />} 
        > back </Button> 

      { Loaded && 
      <div className='btn-grp' style={{marginLeft:'35px'}}>
        <Button onClick={()=>setShowcheck(!showcheck)}
          variant='outlined'
          sx={{textTransform: 'none',mr:1}}
          > { showcheck? "Hide" : "Show"} Answers </Button>

        <Button sx={{textTransform: 'none'}} 
          startIcon={<BookmarkBorderOutlinedIcon sx={{mr:-0.5}}/>} 
          variant='contained' 
          onClick={handleSave}
          >save</Button>  
      </div>
      }
       
      </Toolbar>
         <Divider /> 
      </AppBar>
     
        
<div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>

  <div style={{maxWidth:'700px'}}>
    { Loaded ? 
    questions.map((q, i)=> (  
        <Paper variant='outlined' sx={{m:2,p:2,maxWidth:700}} key={i}> 
   
        <div style={{float:'right',marginBottom:'5px'}}>
        <Tooltip title={<>
        <p> Category : &nbsp; {q.category} </p>
        <p> Difficulty : &nbsp; {q.difficulty} </p>
        </> } disableFocusListener arrow>  
        <IconButton>  <InfoOutlinedIcon /> </IconButton> 
       </Tooltip>
        </div>

        <Typography> {q.questionText} </Typography> 
           { q.options.map(opt=> ( 
               <Typography> 
               <Radio checked={showcheck? opt.optionText===q.correct_answer : false} color='success'/> 
                    {opt.optionText} 
                </Typography> ) ) 
            }             
        </Paper> 
    ) ) 
        : <CircularProgress sx={{mt:10}}/> 
    }
  </div>
</div>
</>
 )
}

export default SampleQuestions;
