import React from 'react'
import Box from '@mui/material/Box';
import { Button, Avatar } from '@mui/material';
import IconButton from '@material-ui/core/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../../actions';

// toggleDrawer : (arg:bool)=> void
const DrawerList = ({ toggleDrawer }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const login = useSelector((state)=> state.auth.login);

  const logout = () => {
    dispatch({ type: LOGOUT });
    history.push('/');
  };

  return (
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

      <div className={login?'flex justify-center':'hidden'}>
      <Button 
        variant="outlined" 
        size="small" 
        className='space-x-1' 
        onClick={()=>logout()}> 
          <p className='lowercase text-base'> logout </p>
          <ExitToAppIcon fontSize="small" />
      </Button> 
      </div>
    </Box>
  )
}

export default DrawerList