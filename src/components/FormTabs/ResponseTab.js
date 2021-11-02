import React,{ useState, useEffect } from 'react';
import MenuVert from './MenuVert';
import { deleteresponse } from '../../actions/response';
import { useStyles } from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { updateQuestion } from '../../actions/questions';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Link from '@mui/material/Link';

function ResponseTab() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const question = useSelector((state)=> id ? state.documents.find((p)=> p._id == id): null);
  const [response, setresponse] = useState([]);

  useEffect(() => {
    setresponse(question.responses);
  }, [question])

 const handleResponse =() => {
    dispatch(updateQuestion(id, { open: !question.open }));
  }

  const handleDelete =(resId) => {
    console.log(resId);
    dispatch(deleteresponse(id, resId));
    setresponse(response=>response.filter((q)=> q._id !== resId))
  }

  return (
    <div style={{display:"flex",justifyContent:"center",width:"100%",height:"100%"}}>
        <Paper className={classes.responsePaper}>

          <div style={{display:'flex'}}>
            <Typography variant="h6"> {response.length} responses </Typography>
            <div style={{marginLeft:"auto"}}><Typography variant="caption"> Accept responses </Typography>
            <Switch
            checked={question.open}
            onChange={handleResponse}
            inputProps={{ 'aria-label': 'controlled' }} />  
            </div>
          </div>

          { !response.length && <div style={{textAlign:'center',marginTop:'35px'}}><Typography> You have no responses yet. </Typography></div>}

          { response.map((res,idx)=> (
           
            <Card key={idx} className={classes.resCard} variant="outlined"> 
            <div className={classes.smallResCard} >
            { !res.user_email &&  <Link href={`/viewtab/response/q?_id=${id}&_res=${idx}`} target='_blank' style={{marginRight:'auto'}}> response {idx+1} </Link>}
            { res.user_email && <Link href={`/viewtab/response/q?_id=${id}&_res=${idx}`} target='_blank' style={{marginRight:'auto'}}>{res.user_email} </Link> }
            <Typography variant="caption" style={{color:"#666666"}}> {moment(res.date).calendar()} </Typography>
            </div>
            <MenuVert id={id} resId={res._id} idx={idx} handleDelete={handleDelete}/>
          </Card>
          )
          )}
        </Paper> 
    </div>
  )
}

export default ResponseTab;
