import { useEffect } from 'react';
import Testform from './Testform';
import Appbar from '../Appbar';
import ResponseTab from './ResponseTab';
import SettingsTab from './SettingsTab';
import { getQuestion } from '../../actions/questions';
import { updateQuestion } from '../../actions/questions';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useHistory, useParams } from 'react-router';

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

function FormTabs() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();

  const auth = useSelector(state => state.auth);
  let email = auth.authData?.result?.email;

  let question = useSelector(state => state.documents.find((p)=> p._id == id));

  useEffect(()=> {
    if (email){
      dispatch(getQuestion(email));
    }
    if (!question) history.push('/');
  },[dispatch, auth])

// should generate questions and email_req onetimeresponse and timer from here
  // tabs value
  const [value, setValue] = useState(0);

  const [responseAccept, setResponseAccept] = useState(true);
  const [responseCount, setResponseCount] = useState(0);

  // email n res_once should come from qs not from state

  // for tabs changing
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
<>
<Appbar />
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
      <Testform />
    </div>    
  </TabPanel>

<TabPanel value={value} index={1}>
    <ResponseTab responseAccept={responseAccept} setResponseAccept={setResponseAccept} responseCount={responseCount} />
</TabPanel>

<TabPanel value={value} index={2}>
    <SettingsTab />
</TabPanel>
</Box>
</>
  );
}
export default FormTabs;