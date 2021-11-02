import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Paper, Grid, Typography, Container } from '@material-ui/core';

import { Alert, Stack } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import Icon from './Icon';
import { signin, signup } from '../../actions/auth';
import { AUTH, CLEAR_ERROR, MODAL } from '../../actions/index';
import useStyles from './styles';
import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const error = useSelector((state)=> state.auth.error);
  const modal = useSelector((state)=> state.auth.modal);

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    dispatch({ type: CLEAR_ERROR });
  }, [])
 
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
    dispatch({ type: CLEAR_ERROR });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      modal ? dispatch(signup(form, null)) : dispatch(signup(form, history));
    } else {
      modal ? dispatch(signin(form, null)) : dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    console.log(res)
    try {
      dispatch({ type: AUTH, data: { result, token }, login: true });
      modal ? dispatch({ type: MODAL, payload: false }) : history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) dispatch({ type: CLEAR_ERROR });
  }

  return (
    <div >
      <Stack justifyContent='center' alignItems='center'>
    <Container component="main" maxWidth="xs" >
    
      <Paper className={classes.paper} variant='outlined' >
      {error && <Alert severity="error" className={classes.alert}> {error.message} </Alert>}
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign In' }</Typography>
        
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name"  handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address"  handleChange={handleChange} type="email" />
            <Input name="password" label="Password"  handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
            clientId="523304893583-mdmosmin7mcq7j6na8u0u72m30rkamlg.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy={"single_host_origin"}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode} size="small">
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
    </Stack>
    </div>
  );
};

export default SignUp;