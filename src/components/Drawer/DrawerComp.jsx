import React,{useState} from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@mui/material/Drawer';
import DrawerList from './DrawerList';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(1),
      [theme.breakpoints.down('md')]: {
        marginRight: 0
      },
      "&:hover": {
        background: 'transparent'
      }
    }
  }));

  // can give external drawer state as well
const DrawerComp = () => {
  const classes = useStyles();

  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };

  return (
  <>     
    <IconButton 
      edge="start" 
      className={classes.menuButton} 
      color="inherit" 
      aria-label="menu" 
      onClick={toggleDrawer(true)}
    >
        <MenuIcon fontSize='large' />
    </IconButton>
    <Drawer
        open={state}
        onClose={toggleDrawer(false)} >
        <DrawerList toggleDrawer={toggleDrawer} />
    </Drawer> 
  </>
  )
}

export default DrawerComp