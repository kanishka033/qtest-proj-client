import { Typography, Box, Button, Card, makeStyles } from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { useHistory } from 'react-router';
import '../App.css';
import Dashboard from './Dashboard';
import work from './img/work.png';

const useStyles = makeStyles((theme) => ({
  add: {
    fontSize: 60,
    color: "#d35400"
  },
  new: {
    color: "#d35400",
    marginRight: "5px"
  },
  addcard: {
    padding: theme.spacing(1.5),
    margin: theme.spacing(1.5),
    boxSizing: "border-box",
    height: 150,
    width: 135,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
    "&:hover": {
      border: "1px solid",
      borderColor:"#2980b9",
      cursor: "pointer"
     }
  }
}));

const MainIntro = ({ login }) => {

const classes = useStyles();
const history = useHistory();

const newBlank = () => {
  history.push('/new')
}

const extraInfo = (
<div id="icons-container" >    
  <p id="usesQuestion"> Who uses <span id="qtest">Qtest?</span> </p>
  <div id="usesIcons"> 
  <div className="iconbox"> <i className="uses fa fa-user"></i>
   <p className="icon-topic">Individual</p>
   <p className="icon-desc">Create fun social quizzes that you can post on your website, blog or other social media site.</p>
  </div>

  <div className="iconbox"> <i className="uses fas fa-chalkboard-teacher"></i>
  <p className="icon-topic">Teachers</p>
  <p className="icon-desc">Quickly create courses or online tests for your students.</p>
  </div>
    
  <div className="iconbox"> <i className="uses fas fa-users"></i>
  <p className="icon-topic">Businesses</p>
  <p className="icon-desc">Create online training and assessments to ensure your staff are always up to date with the right skills.</p></div>
  </div>
</div>
)
  
return(
 <>
<div id="main" className={login?"main-logged":"main-logout"}>
 
<div id="container">
  <div className="description">
    <p id="title"> Easy online test and form making </p> 
    <Box mb={2} mt={2}>  
      <Typography variant="h5">Create, send and analyze your forms, assessments and quizzes for free.  </Typography> 
    </Box>
    {!login && <button id="getstarted">Get started <i className="fas fa-angle-double-right"></i></button> }
  </div> 
</div> 
  
{ login ? 
  ( <div id="create-new"> 
  <><Typography variant="h6"> Create New : </Typography> </>
  <><Card elevation={3} className={classes.addcard} onClick={()=>newBlank()}> 
  <PostAddIcon className={classes.add} fontSize="large"/> 
  <Typography className={classes.new} variant="button"> Blank </Typography>
  </Card> </> 
  </div> ) :
  ( <div className="right-main">
      <img src={work} style={{height:"18rem",width:"19rem"}} alt=""/>    
    </div> )
  }
</div>

<div>
  { login? <Dashboard /> : extraInfo }
</div>
</>
)
}

  export default MainIntro;