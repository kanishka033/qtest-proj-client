import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './testform.css';
import { getQuestion, CreateQuestion, updateQuestion } from '../../actions/questions';
import { useParams, useHistory } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ShortTextIcon from '@material-ui/icons/ShortText';
import SubjectIcon from '@material-ui/icons/Subject';
import {BsTrash} from "react-icons/bs"
import { IconButton } from '@material-ui/core';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// ------------------------------------------
import {Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
      fontSize: 10.5
    },
    margin: {
      marginBottom: theme.spacing(1.5)
    }
}));

function Testform() {
const classes = useStyles();
let { id } = useParams();
const dispatch = useDispatch();
const history = useHistory();
const user = JSON.parse(localStorage.getItem('profile'));

const question = useSelector((state)=> id ? state.documents.find((p)=> p._id === id): null);
console.log(question)

const [questions,setQuestions] =useState([]); 
const [documentName,setDocName] =useState("untitled Document"); 
const [documentDescription,setDocDesc] = useState(""); 
const [questionType,setType] = useState("radio");

const questionSet = { documentName, documentDescription, questions }

useEffect(()=>{
  let newQuestion = {questionText: "Question",questionType:"radio", options : [{optionText: "Option 1"}], open: true}
  setQuestions(questions=>[...questions, newQuestion]) 
},[])

  useEffect(()=>{
    if(question) {
      setQuestions(question.questions)
      setDocName(question.documentName)
      setDocDesc(question.documentDescription)
    }
  },[question])

   function changeType(e){
    setType(e.target.id)
  }

  useEffect(()=>{
    setType(questionType)
   },[changeType])
 
  function commitToDB(e){
    let url = uuidv4();
    e.preventDefault();
    if (id) {
      dispatch(updateQuestion(id, {...questionSet }))
    } else {
      dispatch(CreateQuestion({
          ...questionSet,
          email: user?.result?.email,
          url, open:true,
          email_required:false,
          res_limit:false 
        })) 
    }
     dispatch(getQuestion());
     history.push('/');
  }

  function addMoreQuestionField(){
      expandCloseAll();
      // required: false -> i removed
      setQuestions(questions=> [...questions, {questionText: "Question", questionType:"radio", options : [{optionText: "Option 1"}], open: true }]);
  }

  function addQuestionType(i,type){
    let qs = [...questions]; 
    if(type === 'text')  qs[i].options = [{optionText: 'answer'}];
    qs[i].questionType = type;
    setQuestions(qs);
  }

function copyQuestion(i){
  expandCloseAll()
  let qs = [...questions]
  let newquestion = {...qs[i]}
  let qsCopy = JSON.parse(JSON.stringify(qs));
  qsCopy.splice(i+1, 0, newquestion);
  setQuestions(qsCopy)
}

  function deleteQuestion(i){
    let qs = [...questions]; 
    if(questions.length > 1){
      qs.splice(i, 1);
    }
    setQuestions(qs)
  }
  
  function handleOptionValue(text,i, j){
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].options[j].optionText = text;
    setQuestions(optionsOfQuestion);
  }

  function handleQuestionValue(text, i){
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].questionText = text;
    setQuestions(optionsOfQuestion);
  }

  function onDragEnd(result) {
      if (!result.destination) return;
      var itemgg = [...questions];
      const itemF = reorder(
        itemgg,
        result.source.index,
        result.destination.index
      );
      setQuestions(itemF);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function addOption(i){
    var optionsOfQuestion = [...questions];
    if(optionsOfQuestion[i].options.length < 5 && optionsOfQuestion[i].questionType !== 'text') {
      optionsOfQuestion[i].options.push({optionText: "Option " + (optionsOfQuestion[i].options.length + 1)})
    } 
    else console.log("Max  5 options ");    
    setQuestions(optionsOfQuestion)
  }

  function removeOption(i, j){
    var optionsOfQuestion = [...questions];
    if(optionsOfQuestion[i].options.length > 1){
      optionsOfQuestion[i].options.splice(j, 1);
      setQuestions(optionsOfQuestion)
    }   
  }

  function expandCloseAll(){
    let qs = [...questions]; 
     for (let j = 0; j < qs.length; j++) {  
      qs[j].open = false;
     }
     setQuestions(qs);
  }

  function handleExpand(i){
    let qs = [...questions]; 
    for (let j = 0; j < qs.length; j++) {
      if(i ===j) {
        qs[i].open = true;
      } else{
        qs[j].open = false;
       }
    } setQuestions(qs);
  }

  // Below funtionalities are unused & kept for future improvement updates
  function showAsQuestion(i){
    let qs = [...questions];  
     qs[i].open = false;
     setQuestions(qs);
  }

  function setOptionAnswer(ans,qno){
    var Questions = [...questions];
      Questions[qno].answer = ans;
    setQuestions(Questions)
    
  }

  function setOptionPoints(points,qno){
    var Questions = [...questions]
      Questions[qno].points = points;
    setQuestions(Questions)
  }

  function addAnswer(i) {
    var answerOfQuestion = [...questions];
      answerOfQuestion[i].answer= !answerOfQuestion[i].answer;
    setQuestions(answerOfQuestion)
  }

  function doneAnswer(i){
    var answerOfQuestion = [...questions];
      answerOfQuestion[i].answer= !answerOfQuestion[i].answer;
    setQuestions(answerOfQuestion)
  }

  function requiredQuestion(i){
    var requiredQuestion = [...questions];
    requiredQuestion[i].required =  ! requiredQuestion[i].required
    setQuestions(requiredQuestion)
  }

function questionsUI(){
  return  questions.map((ques, i)=> (
  <Draggable key={i} draggableId={i + 'id'} index={i}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef}       
        {...provided.draggableProps}
        {...provided.dragHandleProps} >
        
        <div>
        <div style={{marginBottom: "0px"}}>
        <div style={{width:'100%', marginBottom: '0px' }}>
        <DragIndicatorIcon style={{transform: "rotate(-90deg)", color:'#DAE0E2',position:"relative",left:"300px"}} fontSize="small"/>
        </div>
          
       <Accordion onChange={()=>{handleExpand(i)}} expanded={questions[i].open} >
       
    { (!questions[i].open) && (
        <AccordionSummary
        className={classes.panelSummary}      
        aria-controls="panel1a-content"
        id="panel1a-header"
        elevation={2} >
                   
      <div className="saved_questions">
        <Typography  style={{fontSize:"15px",fontWeight:"400",letterSpacing: '.1px',lineHeight:'24px',paddingBottom:"8px"}} >{i+1}.  {ques.questionText}</Typography>
                
      {ques.options.map((op, j)=>(
                 
      <div key={j} >
      <div style={{display: 'flex'}}>
      <FormControlLabel style={{marginLeft:"5px",marginBottom:"5px"}} 
      disabled control={<input type={ques.questionType}  placeholder = {ques.questionType === 'text' && ques.options[j].optionText} color="primary" style={ques.questionType === 'text'? {marginRight: '3px',minHeight:'30px',width:'220px'}: null} required={ques.type}/>} 
      label={ ques.questionType !== 'text' &&
      <Typography style={{fontFamily:' Roboto,Arial,sans-serif',fontSize:'13px', fontWeight: '400', letterSpacing: '.2px',lineHeight: '20px', color: '#202124'}}>
       {ques.options[j].optionText}
      </Typography>                
       } />
      </div>  
   </div>
     ))}  
    </div>            
     </AccordionSummary> ) }      

      {!ques.answer ? (
      <AccordionDetails className="add_question" >
                     
  <div className="add_question_top">
      <input type="text" className="question" placeholder="Question" value={ques.questionText} onChange={(e)=>{handleQuestionValue(e.target.value, i)}}></input>
                                 
    <Select className="select">            
      <MenuItem id="text" value="Text" onClick= {()=>{addQuestionType(i,"text")}}> <SubjectIcon style={{marginRight:"10px"}} />  Paragraph</MenuItem>                         
      <MenuItem id="checkbox"  value="Checkbox" onClick= {()=>{addQuestionType(i,"checkbox")}}><CheckBoxIcon style={{marginRight:"10px" ,color:"#70757a"}} checked /> Checkboxes</MenuItem>
      <MenuItem id="radio" value="Radio" onClick= {()=>{addQuestionType(i,"radio")}}> <Radio style={{marginRight:"10px",color:"#70757a"}} checked/>Multiple Choice</MenuItem>
    </Select>                               
  </div>    

  <div className="option-body">           
  {ques.options.map((op, j)=>(
    <div className="add_question_body" key={j}>
    {
    (ques.questionType!="text") ? 
    <input type={ques.questionType}  style={{marginRight:"10px"}} disabled={true}/> :
    <ShortTextIcon style={{marginRight:"10px"}} />
    }                            
    <div >
     <input type="text" className="text_input" placeholder="option"  value={ques.options[j].optionText}onChange={(e)=>{handleOptionValue(e.target.value, i, j)}}></input>
    </div>                      

   <IconButton aria-label="delete" onClick={()=>{removeOption(i, j)}}>
    <CloseIcon />
  </IconButton>
  </div>   
  ))} </div>        
     
   <div className="add_footer">
   <div className="add_question_bottom_left">
     { ques.questionType !== 'text'? <Button size="small"  onClick={()=>{addOption(i)}} style={{textTransform:'none',color:"#4285f4",fontSize:"13px",fontWeight:"600"}}> Add Option </Button> 
     : <Button size="small" style={{textTransform:'none',fontSize:"13px",fontWeight:"600",cursor:'not-allowed',pointerEvents:'auto'}} disabled> Add Option </Button>
   }                  
   </div>
   
    <div className="add_question_bottom">
                              
      <Button className={classes.button}
        variant="outlined"
        color="default"
        size="small"
        startIcon={<FilterNoneIcon/>}
        onClick={()=>{copyQuestion(i)}}> Clone </Button>  
       
      <Button className={classes.button}
        variant="outlined"
        color="secondary"
        size="small"
        startIcon={<BsTrash />}
        onClick={()=>{deleteQuestion(i)}}> Delete </Button>      
     
    <div className="question_edit">
     <AddCircleOutlineIcon onClick={addMoreQuestionField} className="edit"/>
    </div>
    </div>
  </div>                  
  </AccordionDetails>)
  :
  ( <AccordionDetails className="add_question" >
                     <div className="top_header"> Choose Correct Answer  </div>                                              
<div >
<div className="add_question_top">
    <input type="text" className="question " placeholder="Question"    value={ques.questionText} onChange={(e)=>{handleQuestionValue(e.target.value, i)}} disabled/>
    <input type="number" className="points" min="0" step="1" placeholder="0" onChange={(e)=>{setOptionPoints(e.target.value, i)}} />      
</div>
{ques.options.map((op, j)=>(
    <div className="add_question_body" key={j} style={{marginLeft:"8px",marginBottom:"10px",marginTop:"5px"}}>
    <div key={j}>
    <div style={{display: 'flex'}} className="">
    <div className="form-check">
    <label style={{fontSize:"13px"}} onClick={()=>{setOptionAnswer(ques.options[j].optionText, i)}}>
  {(ques.questionType!="text") ? 
        <input
        type={ques.questionType}
        name={ques.questionText}      
        value="option3"
        className="form-check-input"
       required={ques.required}
      style={{marginRight:"10px",marginBottom:"10px",marginTop:"5px"}}
    /> : <ShortTextIcon style={{marginRight:"10px"}} /> }                                 
  {ques.options[j].optionText} </label>  
     </div>
  </div>
 </div>      
  </div>   
))}  
</div>
</AccordionDetails>                 
)}                                 
  </Accordion>
   </div>
    </div>
   </div>  )}
</Draggable> 
  )
)
}

 return  (
    <div className="question_form">  <br></br>  
      <div className="section">
           
  <div className="question_title_section">        
  <div className="question_form_top">

    <TextField id="outlined-basic"
     fullWidth 
     className={classes.margin}
     label="Document Name" 
     variant="outlined" 
     placeholder={documentName} 
     value={documentName} 
     onChange={(e)=>{setDocName(e.target.value)}}/>
  
    <TextField id="outlined-basic"
    fullWidth 
    multiline
    label="Description" 
    variant="outlined"
    placeholder={documentDescription} 
    value={documentDescription} 
    onChange={(e)=>{setDocDesc(e.target.value)}}/>
    
  </div>
  </div>   
     
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable">
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
            ref={provided.innerRef} >
              {questionsUI()}
          {provided.placeholder}
          </div>
        )} 
    </Droppable>
  </DragDropContext>

  <div className="save_form">
      <Button variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
        onClick={(e)=>commitToDB(e)} 
        style={{fontSize:"14px"}}> Save </Button>
  </div>
  </div>        
</div> 
)
}

export default Testform;