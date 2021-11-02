import { React, useEffect, useState } from 'react';
import ShareDialog from './ShareDialog';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { LOGOUT } from '../actions';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button, Chip, Avatar } from '@mui/material';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import decode from 'jwt-decode';
import ShareIcon from '@mui/icons-material/Share';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PostAddIcon from '@mui/icons-material/PostAdd';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      marginRight: 0
    }
  },
  heading: {
    color: '#FFFFFF',
    textDecoration: 'none',
  },
  profile: {
    display: "flex",
    marginLeft: "auto",
  },
  userName:{
    padding: 10,
    marginLeft: 'auto',
  }
}));

function Appbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const history =  useHistory();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  let edit = null;
  if (id) edit = true;

  useEffect(()=>{
    const token = user?.token;

    if(token){
      const decodedToken = decode(token);
      if(decodedToken.exp * 1000 < new Date().getTime()) logout()
    }
    setUser(JSON.parse(localStorage.getItem('profile')))
  },[location])

  // shareDialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
    setUser(null)
    history.push('/');
  };

  // drawer state
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };

const list = (
    <Box
      sx={{ width: 250 }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >   
      <div style={{margin:'7px 4px 7px 190px'}}>
        <IconButton>
          <ArrowBackIosNewIcon />
        </IconButton>
      </div>
        <Divider />

      <List>
          <ListItem button key='Create blank' onClick={()=>history.push('/new')} >         
            <ListItemIcon>
            <PostAddIcon />
            </ListItemIcon>
            <ListItemText primary='Create blank' />
          </ListItem>

        <ListItem button key='Create Sample' onClick={()=>history.push('/sample')} >
            <ListItemIcon>
               <InboxIcon />
            </ListItemIcon>
            <ListItemText primary='Sample Questions' />
        </ListItem>
      </List>  

    </Box>
  );

return (
  <div className={classes.root}>
  <AppBar position="sticky" elevation={3}>
    <Toolbar>
      
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
        <Drawer
            open={state}
            onClose={toggleDrawer(false)} >
          {list}
        </Drawer>

      <div style={{padding:"5px", marginRight:"auto"}} >
      <Typography component={Link} to='/' variant="h6" className={classes.heading}>
        Qtest
      </Typography> 
      </div>

  { edit? <>
         <Button 
            variant="contained" 
            style={{backgroundColor:'#8c7ae6'}} 
            sx={{margin: 1 }} 
            endIcon={<ShareIcon/>} 
            onClick={handleClickOpen}
          > share 
        </Button>
        <IconButton> 
          <HelpOutlineIcon style={{color:"white"}}/> 
        </IconButton> </> : null }
   
  { !edit && user?.result && (
      <div className={classes.profile}>
      <Chip sx={{ marginBottom:2, marginTop:2 }}
        avatar={<Avatar alt={user.result.name} src={user.result.imageUrl} sx={{ bgcolor: '#ED6C02'}}>{user.result.name.charAt(0).toUpperCase()}</Avatar>}
        label={ <p style={{color:"white",fontSize:'17px'}}>{user.result.givenName}</p> }
        variant="outlined" />     
      <IconButton onClick={logout}> <ExitToAppIcon fontSize="large" sx={{color:"white"}}/> </IconButton>
      </div>
  )}

    { !edit && !user?.result && ( 
      <Button className={classes.rightbtn} component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
    )}

      </Toolbar>
    </AppBar>
      <ShareDialog open={open} handleClose={handleClose} />
    </div>
  );
}
export default Appbar;