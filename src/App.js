import React, { useState } from 'react';
import './App.css'
import Navbar from './components/Navbar';
import MainIntro from './components/MainIntro';
import Dashboard from './components/Dashboard';
import Testform from './components/Testform';
import FormTabs from './components/FormTabs';
import Appbar from './Appbar';
import { Router, Switch, Route } from 'react-router-dom';
import history from './components/history';

//<Dashboard currentId={currentId} />
//<Testform currentId={currentId} setCurrentId={setCurrentId}/>

function App() {
  const [login,setLogin] = useState(true);
  const [currentId, setCurrentId] = useState('')

return (
<>
<Router history={history}>
<Switch>
<Route path="/new"> 
   <Appbar />
   <Testform currentId={currentId} setCurrentId={setCurrentId}/>
</Route>

<Route path={`/form/:id/edit`} > 
   <Appbar />
   <FormTabs currentId={currentId} setCurrentId={setCurrentId}/>
</Route>

<Route path="/">
  <Appbar />
  <MainIntro currentId={currentId} setCurrentId={setCurrentId} login={login} />
</Route>



</Switch>
</Router>
</>
)
}

export default App;