import React, { useState, useEffect } from 'react';
import MainIntro from './components/MainIntro';
import Userform from './components/UserForm/Userform';
import Testform from './components/FormTabs/Testform'
import FormTabs from './components/FormTabs/FormTabs';
import Appbar from './components/Appbar';
import Submitted from './components/UserForm/Submitted';
import SampleQset from './components/SampleQset';
import Closed from './components/UserForm/Closed';
import SampleQuestions from './components/SampleQuestions';
import { AUTH } from './actions';
import { getQuestion } from './actions/questions';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import history from './components/history';
import SignUp from './components/Auth/SignUp';
import ResponseView from './components/ResponseView';
import { Stack } from '@mui/material';
import Home from './components/Home/Home';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch();
  const login = useSelector((state)=> state.auth.login);
  
  useEffect(() => {
    if(user) {
      dispatch({ type: AUTH, data: user, login: true });
      dispatch(getQuestion(user.result.email))
    } 
  }, [user])

return (
<>

<Router history={history}>
<Switch>
<Route path="/response/:url">
  <Userform />
</Route>

 
<Route path="/new"> 
  { login ? 
    <>
      <Appbar />
      <Testform />
    </>
    : <Redirect to='/auth' /> }
</Route>
  
<Route path={'/form/:id/edit'} component={FormTabs} /> 

<Route path='/auth'> 
  <Stack direction="row" justifyContent="center" alignItems="center" sx={{height:'100vh'}}>
    <SignUp />
  </Stack> 
</Route>

<Route path='/viewtab/response' component={ResponseView} /> 

{/* shouldnt be accessed manually (shows error blank) */}
<Route path="/:url/submit" component={Submitted} /> 
 
<Route path="/closed" component={Closed} /> 

<Route path="/sample/Questions" component={SampleQuestions} /> 

<Route path="/sample" component={SampleQset} /> 

<Route path="/">
  <Home />
  {/* <Appbar />
  <MainIntro login={login} /> */}
</Route>

</Switch>

</Router>
</>
)
}

export default App;