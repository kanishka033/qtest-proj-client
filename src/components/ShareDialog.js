import React,{ useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LinkIcon from '@mui/icons-material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar from '@mui/material/Snackbar';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('md')]: {
          width: 260,
        },
        [theme.breakpoints.up('md')]: {
          width: 400,
        }
      }
}));

function ShareDialog({ handleClose, open }) {

const { id } = useParams();
const classes = useStyles();

const [copied, setCopied] = useState(false);

const question = useSelector((state)=> id ? state.documents.find((p)=> p._id == id): null);
let url = null;
if (question) url = question.url

const handleCopy = () => {
   setCopied(true);
   document.getElementById('textbox').select();
}

  return (
    <>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Share</DialogTitle>
        <DialogContent >
          <DialogContentText>
            Link to send 
          </DialogContentText>
          <TextField className={classes.root}
            value={`#/response/${url}`}
            margin="dense"
            id="textbox"
            fullWidth
            variant="outlined"
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LinkIcon />
                  </InputAdornment>
                ),
              }}
          />
        </DialogContent>
        <DialogActions sx={{marginBottom:1}}>
          <Button onClick={handleClose} color="inherit" variant="outlined" sx={{marginRight:0.5}}>Cancel</Button>
          <CopyToClipboard text={`http://localhost:3000/response/${url}`}>
          <Button onClick={handleCopy} variant='contained' sx={{marginRight:2}}>Copy</Button>
          </CopyToClipboard>
        </DialogActions>
    </Dialog>

    <Snackbar
      open={copied}
      anchorOrigin={{ vertical:'bottom', horizontal:'left' }}
      autoHideDuration={1000}
      onClose={()=>setCopied(false)}
      message="Copied!"/>
  </>    
  );
}
export default ShareDialog;