import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getQuestion, deleteQuestion } from "../actions/questions";
import './dashboard.css';
import { Card, CardActions, Grid, makeStyles, CardContent, Typography, Button } from "@material-ui/core";
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import moment from 'moment';
import { CircularProgress, AlertTitle, Alert } from '@mui/material'; 
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
   card: {
     margin: theme.spacing(1.5),
     width: 200,
     height: 125,
     border: '1px solid',
     borderColor: 'white',
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

// now tat auth is removed from getQUestions use req.userId instead of email to make it safer(see if userid comes from auth itself)
const Dashboard = () => {
const classes = useStyles();
const dispatch = useDispatch();
const history = useHistory();

const question = useSelector((state)=> state.documents);
const auth = useSelector(state => state.auth);

const [docs, setDocs] = useState(false);

let email = auth.authData.result.email;

const handleCardClick =(id)=> {
   history.push(`/form/${id}/edit`);
}

const noDocs = (
   <Alert severity="info" variant='outlined' sx={{p:2,mt:5}}>
      <AlertTitle> You have no recent docs </AlertTitle> 
      <span style={{marginLeft:'20px'}}> Create your own </span>
   </Alert>
)

useEffect(()=>{
   if (email){
      dispatch(getQuestion(email))
   }
},[dispatch, auth])

useEffect(()=> {
  setDocs(question);
},[question])

return (
<div className="container">
 <div id="dash-container">
 <div id="recent-forms"> <Typography variant="button">Recent Documents</Typography></div>
 <div id="card-container">

 { docs && !question.length && noDocs }

{ docs && question.map((qs,index)=>( 
   <Card className={classes.card} key={index} >
      <CardContent onClick={()=>handleCardClick(qs._id)}>
         <Grid container display="flex">
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
   )) }
   { !docs && <CircularProgress sx={{margin:5}}/> }
 </div>
 </div>
</div>
)}

export default Dashboard;