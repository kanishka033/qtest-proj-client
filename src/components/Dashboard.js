import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getQuestion, deleteQuestion } from "../actions/questions";
import history from "./history";
import './dashboard.css';
import { Card, CardActions, Grid, makeStyles,  IconButton, CardContent, Typography, Button } from "@material-ui/core";
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import moment from 'moment';

// from here the _id should originate(rn its in <App>) & dispatch getquestions 
// mapped divs on click should link/ route to testform component with the currentID/_id
const useStyles = makeStyles((theme) => ({
   card: {
     margin: theme.spacing(1.5),
     width: 200,
     height: 125,
     "&:hover": {
      border: "1px solid",
      borderColor:"#2980b9",
      cursor: "pointer"
     }
   },
   subheader: {
      marginLeft: theme.spacing(1),
   },
   fileicon: {
      marginRight: theme.spacing(1),
      color: "#d35400"
   },
   remove: {
      fontSize: "10px"
   },
   action: {
      display: "flex",
      justifyContent: "center",
      borderTop: "0.5px solid",
      borderTopColor: "#E0E0E0"
   },
   name: {
      maxWidth: 132,
      maxHeight: 20,
   }
}));

const Dashboard = ({ currentId, setCurrentId }) => {
const classes = useStyles();
const dispatch = useDispatch();
const question = useSelector((state)=> state.questions);

console.log(question)
console.log(currentId)

const handleCardClick =(id)=>{
   setCurrentId(id);
   history.push(`/form/${id}/edit`)
}

useEffect(()=>{
  dispatch(getQuestion())
},[dispatch])
return (
<div className="container">
 <div id="dash-container">
 <div id="recent-forms"> <Typography variant="button">Recent Documents</Typography></div>
 <div id="card-container">            
{question.map((qs,index)=>( 
 <Card variant='outlined' elevation={2} className={classes.card} key={index} >
  <CardContent onClick={()=>handleCardClick(qs._id)}>
   <Grid container display="flex" flexDirection="row">
        <Grid item>
         <DescriptionOutlinedIcon className={classes.fileicon}/>
      </Grid>
     <Grid item className={classes.name}>
   <Typography noWrap variant="subtitle2">{qs.documentName}</Typography>
      </Grid>
  </Grid>
   <div style={{color:"#666666",fontSize:"12px",padding:"3px",marginLeft:"3px"}}>
      {moment(qs.date).format('ll')} 
   </div>
 </CardContent>
 <CardActions className={classes.action}>
   <Button className={classes.remove} variant="outlined" color="primary" size="small"
   onClick={()=>{handleCardClick(qs._id)}}>edit</Button>

    <Button className={classes.remove} variant="outlined" size="small"
   onClick={()=>{dispatch(deleteQuestion(qs._id))}}>Remove</Button>
 </CardActions>
</Card>
   ))} 
 </div>
 </div>
</div>
)}

export default Dashboard;