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
import decode from 'jwt-decode';
import ShareIcon from '@mui/icons-material/Share';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DrawerComp from './Drawer/DrawerComp';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

return (
  <div className={classes.root}>
  <AppBar position="sticky" elevation={3}>
    <Toolbar>
      <DrawerComp />
      <div style={{padding:"5px", marginRight:"auto"}} >
      <Typography component={Link} to='/' variant="h6" className={classes.heading}>
        Qforms
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