import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { Login } from './Pages/index'

import MainLayout from './Layout/MainLayout'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <MainLayout exact path="/login" component={Login} />
      <Route component={() => <div>Page not Found</div>} />
    </Switch>
  </BrowserRouter>
)

export default Routes
