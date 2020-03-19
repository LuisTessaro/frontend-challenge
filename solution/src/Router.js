import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import MainLayout from './Layout/MainLayout'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <MainLayout exact path="/login" component={''} />
      <Route component={() => <div>Page not Found</div>} />
    </Switch>
  </BrowserRouter>
)

export default Routes
