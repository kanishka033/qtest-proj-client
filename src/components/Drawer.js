import React,{ useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function TemporaryDrawer() {

  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState( open );
  };

  const list = (
    <Box
      sx={{ width: 250 }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
       
          <ListItem button key='Create blank' onClick={()=>console.log('Create blank')}>
            <ListItemIcon>
                 <InboxIcon />
            </ListItemIcon>
            <ListItemText primary='Create blank' />
          </ListItem>

          <ListItem button key='Create Sample' onClick={()=>console.log('Create from Sample')}>
            <ListItemIcon>
                 <MailIcon />
            </ListItemIcon>
            <ListItemText primary='Sample Questions' />
          </ListItem>

      </List>
      <Divider />

      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              { index % 2 === 0 ? <InboxIcon /> : <MailIcon /> }
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
        <React.Fragment >
          <Button onClick={toggleDrawer(true)}></Button>
          <Drawer
            open={state}
            onClose={toggleDrawer(false)}
          >
            {list}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
