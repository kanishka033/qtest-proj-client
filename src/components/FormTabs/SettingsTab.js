import React,{ useState, useEffect } from 'react';
import { useStyles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { updateQuestion } from '../../actions/questions';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

// on unmount the settings will be saved to db questions
function SettingsTab() {
  const classes = useStyles();
  const { id } = useParams();
 const dispatch = useDispatch();
 const question = useSelector((state)=> id ? state.documents.find((p)=> p._id == id): null);
    
  const handleEmail =() => {
    dispatch(updateQuestion(id, {email_required: !question.email_required}));
  }
// requires signin & user can respond only once and cant change it / response cant be changed
  const handleResLimit =() => {
    dispatch(updateQuestion(id, {res_limit: !question.res_limit}));
  }

    return (
      <div style={{display:"flex",justifyContent:"center",width:"100%",height:"100%"}}>
        <Paper className={classes.settingsPaper} >
         
        <div style={{display:"flex",margin:"15px 25px 25px 25px",paddingBottom:"20px",borderBottom:"0.5px solid",borderBottomColor:"#C4C4C4"}}>
          <label> <Typography display="inline" variant="subtitle1" >Collect Email address</Typography>
          <Switch
          checked={question.email_required}
          onChange={handleEmail}
          inputProps={{ 'aria-label': 'controlled' }} /> </label>
        </div>
    
        <div style={{display:"flex",margin:"15px 25px 25px 25px",paddingBottom:"20px",borderBottom:"0.5px solid",borderBottomColor:"#C4C4C4"}}>
          <label> <Typography display="inline" variant="subtitle1" >Limit to 1 response</Typography>
          <Switch
          checked={question.res_limit}
          onChange={handleResLimit}
          inputProps={{ 'aria-label': 'controlled' }} /> </label>
        </div>

        </Paper> 
      </div>    )
}

export default SettingsTab;
