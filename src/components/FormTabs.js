import Testform from './Testform';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import FormControlLabel from '@material-ui/core/FormControlLabel'


const useStyles = makeStyles({
  tab:{
    fontSize:13,
    fontWeight:"600",
  },
  responsePaper:{
   minHeight: 400,
   width: 700,
   margin: 8,
   marginTop: 20,
   padding: 25
  },
  settingsPaper: {
    width: 500,
    height: 300,
    margin: 8,
    marginTop: 20,
    padding: 15
  },
  resCard: {
    padding: 12,
    margin: "25px 5px"
  }
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        
          <div>{children}</div>
   
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function FormTabs({currentId, setCurrentId}) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [responseChecked, setResponseChecked] = useState(true);
  const [responseCount, setResponseCount] = useState(0);
  const [email, setEmail] = useState(false);

  const handleResponse =() => {
    setResponseChecked(!responseChecked)
  }

  const handleEmail =() => {
    setEmail(!email)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
  <Box >
    <Box>
    <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      centered
      className={classes.tabs}
    >
    <Tab label="Questions" className={classes.tab} {...a11yProps(0)} />
    <Tab label="Responses" className={classes.tab} {...a11yProps(1)}/>
    <Tab label="Settings" className={classes.tab} {...a11yProps(2)}/>
    </Tabs> 
    </Box>

<TabPanel value={value} index={0} >
    <div style={{height:"100vh"}}>
      <Testform currentId={currentId} setCurrentId={setCurrentId}/>
    </div>    
  </TabPanel>

<TabPanel value={value} index={1}>
  <div style={{display:"flex",justifyContent:"center",width:"100%",height:"100%"}}>
  <Paper className={classes.responsePaper}>
    <div style={{display:'flex'}}>
      <Typography variant="h6"> {responseCount} responses </Typography>
      <div style={{marginLeft:"auto"}}><Typography variant="caption"> Accept responses </Typography>
      <Switch
      checked={responseChecked}
      onChange={()=>handleResponse()}
      inputProps={{ 'aria-label': 'controlled' }} />  
      </div>
    </div>
    <Card className={classes.resCard}> response 1</Card>
    <Card className={classes.resCard}> response 2</Card>
  </Paper> 
  </div>
</TabPanel>

<TabPanel value={value} index={2}>
  <div style={{display:"flex",justifyContent:"center",width:"100%",height:"100%"}}>
    <Paper className={classes.settingsPaper}>
     
    <div style={{display:"flex",margin:"15px 25px 25px 25px",paddingBottom:"20px",borderBottom:"0.5px solid",borderBottomColor:"#C4C4C4"}}>
      <label> <Typography display="inline" variant="subtitle1" >Collect Email address</Typography>
      <Switch
      checked={email}
      onChange={()=>handleEmail()}
      inputProps={{ 'aria-label': 'controlled' }} /> </label>
     </div>

     <div style={{display:"flex",margin:"15px 25px 25px 25px",paddingBottom:"20px",borderBottom:"0.5px solid",borderBottomColor:"#C4C4C4"}}>
      <label> <Typography display="inline" variant="subtitle1" >Limit to 1 response</Typography>
      <Switch
      checked={true}
      onChange={()=>{}}
      inputProps={{ 'aria-label': 'controlled' }} /> </label>
     </div>
      timer
    </Paper> 
    </div>
</TabPanel>
</Box>
  );
}
export default FormTabs;