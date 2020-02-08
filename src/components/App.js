import React  from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Menu from './Usuarios/menu'
import Usuarios from './Usuarios';

const Tareas = ()=><div>Tareas</div>

const App = () => (
  <BrowserRouter>
    <Menu />
    <div className="margen">
      <Route exact path='/' component={Usuarios} />
      <Route exact path='/tareas' component={Tareas} />
    </div>
    
  </BrowserRouter>
)

export default App;