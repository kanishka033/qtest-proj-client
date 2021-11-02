import React,{ useState } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Divider from '@mui/material/Divider';

function MenuVert(props) {

const dispatch = useDispatch();

 const [anchorEl, setAnchorEl] = useState(null);
 const open = Boolean(anchorEl);
  
    const handleVertClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleOpenTab = (idx) => {
      setAnchorEl(null);
      window.open(`/viewtab/response/q?_id=${props.id}&_res=${idx}`);
    }

    return (
        <div>
            <IconButton style={{margin:'-10px',marginLeft:'auto'}} onClick={handleVertClick}> 
              <MoreVertIcon />
            </IconButton>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
              'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem style={{margin:"-3px"}} onClick={()=>handleOpenTab(props.idx)}>Open tab<OpenInNewIcon style={{color:"#666666",marginLeft:'4px'}}/></MenuItem>
              <Divider/>
              <MenuItem style={{margin:"-3px"}}  onClick={()=>props.handleDelete(props.resId)}>Delete</MenuItem>

            </Menu>
        </div>
    )
}

export default MenuVert;
