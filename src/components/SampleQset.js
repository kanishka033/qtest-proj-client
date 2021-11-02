import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSample } from '../actions/questions';
import { Select, FormControl, MenuItem, InputLabel, Paper, TextField, Button, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useHistory } from 'react-router';


const categories = [  { name: 'General Knowledge', num: 9 },
                      { name: 'Books', num: 10 },
                      { name: 'Films', num: 11 },
                      { name: 'Music', num: 12 },
                      { name: 'Musicals & theatres', num: 13 },
                      { name: 'Television', num: 14 },
                      { name: 'Video Games', num: 15 },
                      { name: 'Board Games', num: 16 },
                      { name: 'science & nature', num: 17 },
                      { name: 'science: Computers', num: 18 },
                      { name: 'Mathematics', num: 19 },
                      { name: 'Mythology', num: 20 },
                      { name: 'Sports', num: 21 },
                      { name: 'Geography', num: 22 },
                      { name: 'History', num: 23 },
                      { name: 'Politics', num: 24 },
                      { name: 'Arts', num: 25 },
                      { name: 'Celebrities', num: 26 },
                      { name: 'Animals', num: 27 },
                      { name: 'Vehicles', num: 28 },
                      { name: 'Comics', num: 29 },
                      { name: 'Gadgets', num: 30 },
                      { name: 'Japanese Anime & Manga', num: 31 },
                      { name: 'Cartoon & Animations', num: 32 }
                   ]

function SampleQset() {

const history = useHistory();
const dispatch = useDispatch();
 
 const [amount, setamount] = useState(10);
 const [category, setcategory] = useState('');
 const [difficulty, setdifficulty] = useState('');
 const [type, settype] = useState('');

 const login = useSelector((state)=> state.auth.login);

 const [url, seturl]= useState(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`);

useEffect(() => {
   seturl(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`)
   if (!login) history.push('/auth');
}, [amount, category, difficulty, type])


const submitSample =(e) => {
    e.preventDefault();
    history.push('/sample/Questions');
    dispatch(getSample(url));
}

// to have placeholder(any type) make sep functions and check value='Any type' then settype('')
return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh'}}>

    <Paper sx={{width:'400px',p:5}}> 
       <Typography variant='h6' sx={{mb:2}}> Sample Questions </Typography>

  <form onSubmit={submitSample}>
    <TextField
        label="No. of questions"
        type="number"
        fullWidth
        InputProps={{ inputProps: { max: 50, min: 1 }  }}
        value={amount}
        onChange={(event)=> setamount(event.target.value)}
    />      

    <FormControl fullWidth margin='normal'>
        <InputLabel> category </InputLabel>
        <Select
            label='Category'
            value={category}
            onChange={(event)=> setcategory(event.target.value)}
        >
        <MenuItem value={''}> <em>Any Category</em> </MenuItem>
        { categories.map((item,i)=> <MenuItem key={i} value={item.num}> {item.name} </MenuItem> )}

        </Select>
    </FormControl>

    <FormControl fullWidth  margin='normal'>
    <InputLabel> Difficulty </InputLabel>
        <Select
            label='difficulty'
            value={difficulty}
            onChange={(event)=> setdifficulty(event.target.value)}
        >
        <MenuItem value={''}> <em>Any difficulty</em> </MenuItem>
        <MenuItem value={'easy'}> Easy </MenuItem>
        <MenuItem value={'medium'}> Medium </MenuItem>
        <MenuItem value={'hard'}> Hard </MenuItem>
        </Select>
    </FormControl>

    <FormControl fullWidth  margin='normal'>
        <InputLabel> Type </InputLabel>
        <Select
            value={type}
            label="type"
            onChange={(event)=>settype(event.target.value)}
        >
        <MenuItem value={''}> <em>Any Type</em> </MenuItem>
        <MenuItem value={'multiple'}>Multiple Choice</MenuItem>
        <MenuItem value={'boolean'}>True/False</MenuItem>
        </Select>
    </FormControl>

    <div style={{textAlign:'center'}}>
    <Button type='submit'
            variant='contained' 
            color='success' 
            size='large' 
            sx={{mt:2,width:100}}
            endIcon={<ChevronRightIcon />} > go</Button> 
    </div>

    </form>
    </Paper>

    </div>
    )
}

export default SampleQset;
