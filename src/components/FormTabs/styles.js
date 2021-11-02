import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme)=> ({
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
      margin: "25px 5px",
      display:'flex'
    },
    smallResCard: {
      display:'flex',
      width:'700px',
      alignItems:'center',
      marginRight:'25px',
      [theme.breakpoints.down('xs')]: {
        flexDirection:'column',
        width:'200px'
      }  
    }
  }));