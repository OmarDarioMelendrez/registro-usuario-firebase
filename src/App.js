import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Inicio from './components/Inicio'
import Admin from './components/Admin'
import Login from './components/Login'
import Menu from './components/Menu'
import FormMascota from './components/FormMascota'

function App() {
  return (
    <div className="container">
      <Router>
          <Menu/>
          <Switch>
            <Route path="/" component={Inicio} exact/>
            <Route path="/admin" component={Admin} exact/>
            <Route path="/login" component={Login} exact/>
            <Route path="/registro-mascota" component={FormMascota} exact/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;